import json
import pprint
from typing import Annotated
from fastapi.encoders import jsonable_encoder
from beanie import PydanticObjectId
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from pymongo.errors import DuplicateKeyError
from core import security_manager
from models import UserSearchPreference, Recipe, SavedRecipe, RecipeCollection, AddCollectionRequest, HealthLabel
from models.recipe_models import RecipeSearchRequest, SetRecipeRequest

recipe_router = APIRouter(prefix="/recipes", tags=["recipes"])

@recipe_router.post("/search")
async def get_recipes(
    param: RecipeSearchRequest,
    current_user: Annotated[str, Depends(security_manager.get_current_user)],
):
    must_clauses = []
    filter_clauses = []
    must_not_clauses = []

    if param.query:
        search_mode = "autocomplete" if param.autocomplete else "text"
        must_clauses.append({
            search_mode: {
                "path": "recipe_name",
                "query": param.query,
                "fuzzy": {
                    "maxEdits": 2,
                    "prefixLength": 0,
                    "maxExpansions": 50
                }
            }
        })

    prefs: UserSearchPreference = await UserSearchPreference.find_one(
        UserSearchPreference.user_id == current_user
    )

    if prefs:
        # === 2) Numerical filter: max_calories ===
        if prefs.max_calories is not None:
            filter_clauses.append({
                "range": {
                    "path": "calories",
                    "lte": prefs.max_calories
                }
            })

        # === 3) Array-field filters (Atlas Search 'equals' inside array) ===
        def array_filter(field_name, values):
            return {
                "text": {
                    "path": field_name,
                    "query": values,
                }
            }

        if prefs.diet_labels:
            filter_clauses.append(array_filter("diet_labels", prefs.diet_labels))

        if prefs.health_labels:
            filter_clauses.append(array_filter("health_labels", prefs.health_labels))

        if prefs.cautions:
            must_not_clauses.append(array_filter("cautions", prefs.cautions))

        if prefs.cuisine_type:
            filter_clauses.append(array_filter("cuisine_type", prefs.cuisine_type))

        if prefs.meal_type:
            filter_clauses.append(array_filter("meal_type", prefs.meal_type))

        if prefs.dish_type:
            filter_clauses.append(array_filter("dish_type", prefs.dish_type))

    # === 4) Build $search stage ===
    search_stage = {
        "$search": {
            "index": "recipes_index",
            "compound": {
                "must": must_clauses,
                "filter": filter_clauses,
                "mustNot": must_not_clauses
            }
        }
    }

    # === 5) Final aggregation pipeline ===
    pipeline = [
        search_stage,
        {"$limit": param.limit}
    ]
    results = await Recipe.aggregate(pipeline, projection_model=Recipe).to_list()
    return list(json.loads(doc.model_dump_json()) for doc in results)

@recipe_router.post("/saved-recipes")
async def set_recipe(
    param: SetRecipeRequest,
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    try:
        recipe_object_id = ObjectId(param.recipe_id)
    except InvalidId:
        return HTTPException(status_code=400, detail="Invalid recipe ID")

    if not await Recipe.get(recipe_object_id):
        return HTTPException(status_code=404, detail="Recipe not found")

    saved_document = await SavedRecipe.find_one(
        SavedRecipe.user_id == current_user,
        SavedRecipe.recipe_id == PydanticObjectId(param.recipe_id),
        SavedRecipe.collection_id == PydanticObjectId(param.collection_id)
    )
    if saved_document:
        if param.amount == 0:
            await saved_document.delete()
            return {"message": f"Recipe {param.recipe_id} removed from saved recipes successfully"}

        saved_document.amount = param.amount
        await saved_document.save()

    elif param.amount > 0:
        if not await RecipeCollection.get(param.collection_id):
            return HTTPException(status_code=404, detail="Collection not found")

        await SavedRecipe(
            user_id=current_user,
            recipe_id=PydanticObjectId(param.recipe_id),
            amount=param.amount,
            collection_id=PydanticObjectId(param.collection_id)
        ).insert()

    return {"message": f"Recipe {param.recipe_id} saved successfully with amount {param.amount}"}

@recipe_router.get("/saved-recipes/{collection_id}")
async def get_saved_recipes(
    collection_id: str,
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    class SavedRecipeWithDetails(BaseModel):
        user_id: str
        collection_id: PydanticObjectId
        recipe_id: PydanticObjectId
        recipe_details: list[Recipe]

    saved_recipe_docs = await SavedRecipe.aggregate([
        {
            "$match": {
                "user_id": current_user,
                "collection_id": PydanticObjectId(collection_id),
            }
        },
        {
            "$lookup": {
                "from": Recipe.Settings.name,
                "localField": "recipe_id",
                "foreignField": "_id",
                "as": "recipe_details",
            }
        }
    ], projection_model=SavedRecipeWithDetails).to_list()

    return list(json.loads(doc.model_dump_json()) for doc in saved_recipe_docs)

@recipe_router.post("/collection")
async def add_collection(
    param: AddCollectionRequest,
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    try:
        doc = await RecipeCollection(user_id=current_user, collection_name=param.collection_name).insert()
    except DuplicateKeyError:
        return HTTPException(status_code=409, detail="Collection already exists")

    return {
        "message": f"Collection {param.collection_name} created successfully",
        "collection_id": str(doc.id)
    }


@recipe_router.get("/collection")
async def get_collections(current_user: Annotated[str, Depends(security_manager.get_current_user)]):
    return await RecipeCollection.find(RecipeCollection.user_id == current_user).to_list(None)


@recipe_router.delete("/collection/{collection_id}")
async def delete_collection(
    collection_id: str,
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    # Delete associated saved recipes
    await SavedRecipe.find(
        SavedRecipe.collection_id == PydanticObjectId(collection_id),
        SavedRecipe.user_id == current_user
    ).delete()

    # Delete the collection itself
    collection_doc = await RecipeCollection.get(collection_id)
    await collection_doc.delete()

    return {"message": f"Collection {collection_doc.collection_name} deleted successfully"}