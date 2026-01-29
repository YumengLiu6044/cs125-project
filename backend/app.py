from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from core.constants import SESSION_SECRET
from core.database import mongo
from routers.auth import auth_router
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(_: FastAPI):
    await mongo.connect()
    yield
    await mongo.disconnect()

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET
)

app.include_router(auth_router)
@app.get('/')
async def root():
    return {"message": "Welcome to Cook Book API"}