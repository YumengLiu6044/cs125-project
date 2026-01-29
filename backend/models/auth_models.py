from typing import Annotated
from pydantic import BaseModel, Field, EmailStr, StringConstraints

class AuthRegisterModel(BaseModel):
    email: EmailStr = Field(default=EmailStr, description="Email address")
    username: str = Field(default=None, description="Username")
    password: str


class AuthLoginModel(BaseModel):
    email: EmailStr = Field(default=EmailStr, description="Email address")
    password: Annotated[str, StringConstraints(min_length=1)]


class AuthForgotPasswordModel(BaseModel):
    email: EmailStr = Field(default=EmailStr, description="Email address")


class AuthResetPasswordModel(BaseModel):
    new_password: str


class Token(BaseModel):
    access_token: str
    scope: str