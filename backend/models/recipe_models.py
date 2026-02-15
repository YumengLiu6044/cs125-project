from pydantic import BaseModel, Field


class RecipeSearchRequest(BaseModel):
    query: str
    limit: int = 10
    autocomplete: bool = True


class SetRecipeRequest(BaseModel):
    recipe_id: str
    collection_id: str
    amount: int = Field(default=1, ge=0)

class AddCollectionRequest(BaseModel):
    collection_name: str