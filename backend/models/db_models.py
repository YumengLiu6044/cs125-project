from enum import Enum
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

class DietLabel(str, Enum):
    HIGH_PROTEIN = "High-Protein"
    HIGH_FIBER = "High-Fiber"
    BALANCED = "Balanced"
    LOW_CARB = "Low-Carb"
    LOW_SODIUM = "Low-Sodium"
    LOW_FAT = "Low-Fat"


class HealthLabel(str, Enum):
    PEANUT_FREE = "Peanut-Free"
    SOY_FREE = "Soy-Free"
    EGG_FREE = "Egg-Free"
    SHELLFISH_FREE = "Shellfish-Free"
    GLUTEN_FREE = "Gluten-Free"
    PALEO = "Paleo"
    FISH_FREE = "Fish-Free"
    VEGAN = "Vegan"
    DAIRY_FREE = "Dairy-Free"
    VEGETARIAN = "Vegetarian"
    TREE_NUT_FREE = "Tree-Nut-Free"
    LOW_SUGAR = "Low Sugar"


class Caution(str, Enum):
    SULFITES = "Sulfites"
    FODMAP = "FODMAP"
    EGGS = "Eggs"
    GLUTEN = "Gluten"
    SHELLFISH = "Shellfish"
    SOY = "Soy"
    MILK = "Milk"
    TREE_NUTS = "Tree-Nuts"
    WHEAT = "Wheat"


class CuisineType(str, Enum):
    INDIAN = "indian"
    FRENCH = "french"
    CHINESE = "chinese"
    SOUTH_EAST_ASIAN = "south east asian"
    CARIBBEAN = "caribbean"
    AMERICAN = "american"
    WORLD = "world"
    JAPANESE = "japanese"
    MIDDLE_EASTERN = "middle eastern"
    KOREAN = "korean"
    CENTRAL_EUROPE = "central europe"
    NORDIC = "nordic"
    BRITISH = "british"
    ASIAN = "asian"
    SOUTH_AMERICAN = "south american"
    GREEK = "greek"
    MEXICAN = "mexican"
    EASTERN_EUROPE = "eastern europe"
    ITALIAN = "italian"
    MEDITERRANEAN = "mediterranean"


class MealType(str, Enum):
    TEATIME = "teatime"
    BREAKFAST = "breakfast"
    BRUNCH = "brunch"
    LUNCH_DINNER = "lunch/dinner"
    SNACK = "snack"


class DishType(str, Enum):
    DRINKS = "drinks"
    BREAD = "bread"
    SALAD = "salad"
    CEREALS = "cereals"
    EGG = "egg"
    DESSERTS = "desserts"
    PREPS = "preps"
    PANCAKE = "pancake"
    PRESERVE = "preserve"
    SPECIAL_OCCASIONS = "special occasions"
    STARTER = "starter"
    BISCUITS_AND_COOKIES = "biscuits and cookies"
    SANDWICHES = "sandwiches"
    MAIN_COURSE = "main course"
    CONDIMENTS_SAUCES = "condiments and sauces"
    SOUP = "soup"
    ALCOHOL_COCKTAIL = "alcohol cocktail"

# ---- Document models -----
class Recipe(Document):
    recipe_name: str
    source: Optional[str] = None
    url: Optional[str] = None

    servings: Optional[float] = None
    calories: Annotated[Optional[float], Indexed()] = None
    total_weight_g: Optional[float] = None
    image_url: Optional[str] = None

    diet_labels: Annotated[List[DietLabel], Indexed()] = []
    health_labels: Annotated[List[HealthLabel], Indexed()] = []
    cautions: Annotated[List[Caution], Indexed()] = []
    cuisine_type: Annotated[List[CuisineType], Indexed()] = []
    meal_type: Annotated[List[MealType], Indexed()] = []
    dish_type: Annotated[List[DishType], Indexed()] = []

    ingredients: List[Ingredient] = []

    daily_values: Dict[str, DailyValue] = {}

    class Settings:
        name = "Recipes"


class User(Document):
    email: Indexed(str, unique=True, index_type=pymongo.ASCENDING)
    username: Optional[str]
    password: Optional[str]

    class Settings:
        name = "Users"


class UserSearchPreference(Document):
    user_id: Annotated[str, Indexed(index_type=pymongo.ASCENDING, unique=True)]

    max_calories: Annotated[Optional[float], Indexed()] = None

    diet_labels: Annotated[List[DietLabel], Indexed()] = []
    health_labels: Annotated[List[HealthLabel], Indexed()] = []
    cautions: Annotated[List[Caution], Indexed()] = []
    cuisine_type: Annotated[List[CuisineType], Indexed()] = []
    meal_type: Annotated[List[MealType], Indexed()] = []
    dish_type: Annotated[List[DishType], Indexed()] = []

    class Settings:
        name = "UserSearchPreferences"