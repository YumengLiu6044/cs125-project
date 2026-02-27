from typing import List
from pydantic import BaseModel, Field
from models import DietLabel, HealthLabel, Caution, CuisineType, MealType, DishType


class RecipeSearchRequest(BaseModel):
    query: str
    page_size: int = Field(default=10, ge=1)
    page_index: int = Field(default=0, ge=0)
    autocomplete: bool = True

    # Filters
    max_calories: int = None

    diet_labels: List[DietLabel] = []
    health_labels: List[HealthLabel] = []
    cautions: List[Caution] = []
    cuisine_type: List[CuisineType] = []
    meal_type: List[MealType] = []
    dish_type: List[DishType] = []


class SetRecipeRequest(BaseModel):
    recipe_id: str
    collection_id: str
    amount: int = Field(default=1, ge=0)

class AddCollectionRequest(BaseModel):
    collection_name: str