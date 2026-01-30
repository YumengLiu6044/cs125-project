from datetime import timedelta
from typing import Optional, Annotated
import pymongo
from beanie import Document, Indexed
from pydantic import BaseModel
from typing import List, Dict

# ---- Nested models -----
class Ingredient(BaseModel):
    food: str
    text: str
    weight: float
    measure: Optional[str] = None
    quantity: float


class DailyValue(BaseModel):
    unit: str
    label: str
    quantity: float


# ---- Document models -----
class Recipe(Document):
    recipe_name: str
    source: Optional[str] = None
    url: Optional[str] = None

    servings: Optional[float] = None
    calories: Annotated[Optional[float], Indexed()] = None
    total_weight_g: Optional[float] = None
    image_url: Optional[str] = None

    diet_labels: Annotated[List[str], Indexed()] = []
    health_labels: Annotated[List[str], Indexed()] = []
    cautions: Annotated[List[str], Indexed()] = []
    cuisine_type: Annotated[List[str], Indexed()] = []
    meal_type: Annotated[List[str], Indexed()] = []
    dish_type: Annotated[List[str], Indexed()] = []

    ingredients: List[Ingredient] = []

    daily_values: Dict[str, DailyValue] = {}

    class Settings:
        name = "Recipes"


# User model
class User(Document):
    email: Indexed(str, unique=True, index_type=pymongo.ASCENDING)
    username: Optional[str]
    password: Optional[str]

    class Settings:
        name = "Users"
        use_cache = True
        cache_expiration_time = timedelta(hours=2)
        cache_capacity = 10