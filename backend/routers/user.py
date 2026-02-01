from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from core import security_manager
from models.user_models import SetSearchPreferenceRequest
from models.db_models import UserSearchPreference, User


def clean_list(values: list[str]) -> list[str]:
    cleaned: list[str] = []
    seen: set[str] = set()
    for value in values:
        if not isinstance(value, str):
            continue
        trimmed = value.strip()
        if not trimmed or trimmed in seen:
            continue
        seen.add(trimmed)
        cleaned.append(trimmed)
    return cleaned

user_router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@user_router.get("/")
async def get_user(
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    user = await User.find_one(User.email == current_user)
    
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "email": user.email,
        "username": user.username
    }


@user_router.get("/search-preferences")
async def get_user_search_preferences(
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    preferences = await UserSearchPreference.find_one(
        UserSearchPreference.user_id == current_user
    )
    
    if not preferences:
        return UserSearchPreference(user_id=current_user)
    
    return preferences


@user_router.post("/search-preferences")
async def set_user_search_preferences(
    param: SetSearchPreferenceRequest,
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    existing = await UserSearchPreference.find_one(
        UserSearchPreference.user_id == current_user
    )
    
    diet_labels = clean_list(param.diet_labels)
    health_labels = clean_list(param.health_labels)
    cautions = clean_list(param.cautions)
    cuisine_type = clean_list(param.cuisine_type)
    meal_type = clean_list(param.meal_type)
    dish_type = clean_list(param.dish_type)

    if existing:
        # update existing preferences
        existing.max_calories = param.max_calories
        existing.diet_labels = diet_labels
        existing.health_labels = health_labels
        existing.cautions = cautions
        existing.cuisine_type = cuisine_type
        existing.meal_type = meal_type
        existing.dish_type = dish_type
        await existing.save()
        return existing
    else:
        # create new preferences
        preferences = UserSearchPreference(
            user_id=current_user,
            max_calories=param.max_calories,
            diet_labels=diet_labels,
            health_labels=health_labels,
            cautions=cautions,
            cuisine_type=cuisine_type,
            meal_type=meal_type,
            dish_type=dish_type
        )
        await preferences.insert()
        return preferences