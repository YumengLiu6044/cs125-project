from pydantic import BaseModel


class RecipeSearchRequest(BaseModel):
    query: str
    limit: int = 10