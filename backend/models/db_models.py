from typing import Optional
import pymongo
from beanie import Document, Indexed
from pydantic import EmailStr

class Users(Document):
    email: Indexed(EmailStr, unique=True, index_type=pymongo.ASCENDING)
    username: Optional[str]
    password: Optional[str]