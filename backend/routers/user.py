from typing import Annotated

from fastapi import APIRouter, Depends

from core import security_manager
from models.user_models import SetSearchPreferenceRequest

user_router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@user_router.get("/")
async def get_user(
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    return ...

@user_router.get("/search-preferences")
async def get_user_search_preferences(
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    ...

@user_router.post("/search-preferences")
async def set_user_search_preferences(
    param: SetSearchPreferenceRequest,
    current_user: Annotated[str, Depends(security_manager.get_current_user)]
):
    ...