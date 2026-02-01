from .db_models import *

class SetSearchPreferenceRequest(BaseModel):
    max_calories: float | None = None

    diet_labels: List[DietLabel] | None = None
    health_labels: List[HealthLabel] | None = None
    cautions: List[Caution] | None = None
    cuisine_type: List[CuisineType] | None = None
    meal_type: List[MealType] | None = None
    dish_type: List[DishType] | None = None
