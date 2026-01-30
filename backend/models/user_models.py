from typing import Optional, List
from pydantic import BaseModel, Field


class SetSearchPreferenceRequest(BaseModel):
    max_calories: Optional[float] = Field(default=None, description="Maximum calories filter")

    diet_labels: List[str] = Field(default_factory=list, description="Diet labels filter")
    health_labels: List[str] = Field(default_factory=list, description="Health labels filter")
    cautions: List[str] = Field(default_factory=list, description="Cautions filter")
    cuisine_type: List[str] = Field(default_factory=list, description="Cuisine types filter")
    meal_type: List[str] = Field(default_factory=list, description="Meal types filter")
    dish_type: List[str] = Field(default_factory=list, description="Dish types filter")
