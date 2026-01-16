from fastapi import FastAPI
from core.constants import DATABASE_NAME

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "hello world"}