from pymongo import AsyncMongoClient
from .constants import COLLECTIONS, DATABASE_URL, DATABASE_NAME


class MongoDBClient:
    _client: AsyncMongoClient | None = None

    async def connect(self):
        self._client = AsyncMongoClient(DATABASE_URL)
        await self._client.admin.command('ping')

    async def disconnect(self):
        await self._client.close()

    @property
    def database(self):
        if self._client is None:
            raise RuntimeError("MongoDB client is not connected")

        return self._client[DATABASE_NAME]

    @property
    def users(self):
        return self.database[COLLECTIONS.USERS]


mongo = MongoDBClient()
