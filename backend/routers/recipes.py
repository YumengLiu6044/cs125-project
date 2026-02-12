from pprint import pprint
from typing import Annotated
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException
from core import security_manager
from models import UserSearchPreference, Recipe, SavedRecipe
from models.recipe_models import RecipeSearchRequest, SetRecipeRequest

recipe_router = APIRouter(prefix="/recipes", tags=["recipes"])

@recipe_router.post("/search")
async def get_recipes(
    param: RecipeSearchRequest,
    current_user: Annotated[str, Depends(security_manager.get_current_user)],
):
    must_clauses = []
    must_not_clauses = []

    if param.query:
        must_clauses.append({
            "autocomplete": {
                "path": "recipe_name",
                "query": param.query
            }
        })

    prefs: UserSearchPreference = await UserSearchPreference.find_one(
        UserSearchPreference.user_id == current_user
    )

    if prefs:
        # === 2) Numerical filter: max_calories ===
        if prefs.max_calories is not None:
            must_clauses.append({
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
            must_clauses.append(array_filter("diet_labels", prefs.diet_labels))

        if prefs.health_labels:
            must_clauses.append(array_filter("health_labels", prefs.health_labels))

        if prefs.cautions:
            must_not_clauses.append({
                "text": {
                    "path": "cautions",
                    "query": prefs.cautions,
                }
            })

        if prefs.cuisine_type:
            must_clauses.append(array_filter("cuisine_type", prefs.cuisine_type))

        if prefs.meal_type:
            must_clauses.append(array_filter("meal_type", prefs.meal_type))

        if prefs.dish_type:
            must_clauses.append(array_filter("dish_type", prefs.dish_type))

    # === 4) Build $search stage ===
    search_stage = {
        "$search": {
            "index": "recipes_index",
            "compound": {
                "must": must_clauses,
                "mustNot": must_not_clauses
            }
        }
    }

    # === 5) Final aggregation pipeline ===
    pipeline = [
        search_stage,
        {"$limit": param.limit}
    ]

    pprint(search_stage)
    results = await Recipe.aggregate(pipeline).to_list()
    for i, _ in enumerate(results):
        results[i]["_id"] = str(results[i]["_id"])
    return results

@recipe_router.post("/set-recipe")
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

    saved_document = await SavedRecipe.find_one(SavedRecipe.user_id == current_user, SavedRecipe.recipe_id == param.recipe_id)
    if saved_document:
        if param.amount == 0:
            await saved_document.delete()
            return {"message": f"Recipe {param.recipe_id} removed from saved recipes successfully"}

        saved_document.amount = param.amount
        await saved_document.save()

    elif param.amount > 0:
        await SavedRecipe(user_id=current_user, recipe_id=param.recipe_id, amount=param.amount).insert()

    return {"message": f"Recipe {param.recipe_id} saved successfully with amount {param.amount}"}

@recipe_router.get("/saved-recipes")
async def get_saved_recipes(
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    saved_documents = await SavedRecipe.find(SavedRecipe.user_id == current_user).to_list(None)
    return saved_documents
