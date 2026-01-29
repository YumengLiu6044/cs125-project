from typing import Optional
import pymongo
from beanie import Document, Indexed
from pydantic import EmailStr, Field

class Users(Document):
    email: Indexed(EmailStr, unique=True, index_type=pymongo.TEXT)
    username: Optional[str]
    password: Optional[str]