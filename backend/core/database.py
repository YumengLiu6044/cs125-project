from beanie import init_beanie
from pymongo import AsyncMongoClient
from models import User, Recipe, UserSearchPreference
from .constants import DATABASE_URL, DATABASE_NAME


class MongoDBClient:
    _client: AsyncMongoClient | None = None

    async def connect(self):
        self._client = AsyncMongoClient(DATABASE_URL)
        await self._client.admin.command('ping')
        await init_beanie(
            database=self.database,
            document_models=[
                User, Recipe, UserSearchPreference
            ]
        )

    async def disconnect(self):
        await self._client.close()

    @property
    def database(self):
        if self._client is None:
            raise RuntimeError("MongoDB client is not connected")

        return self._client[DATABASE_NAME]

mongo = MongoDBClient()
