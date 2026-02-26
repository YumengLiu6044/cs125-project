from pydantic import BaseModel, Field


class RecipeSearchRequest(BaseModel):
    query: str
    page_size: int = Field(default=10, ge=1)
    page_index: int = Field(default=0, ge=0)
    autocomplete: bool = True


class SetRecipeRequest(BaseModel):
    recipe_id: str
    collection_id: str
    amount: int = Field(default=1, ge=0)

class AddCollectionRequest(BaseModel):
    collection_name: str