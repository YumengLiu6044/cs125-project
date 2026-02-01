from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from core import security_manager
from models.user_models import SetSearchPreferenceRequest
from models.db_models import UserSearchPreference, User

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

    if existing:
        # update existing preferences
        for field, val in param.model_dict(exclude_unset=True):
            setattr(existing, field, val)

        await existing.save()
        return existing
    else:
        # create new preferences
        preferences = UserSearchPreference(
            user_id=current_user,
            **param.model_dump(exclude_unset=True)
        )
        await preferences.insert()
        return preferences