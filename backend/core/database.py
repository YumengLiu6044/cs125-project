from pymongo import AsyncMongoClient
from core.constants import DATABASE_URL, DATABASE_NAME


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



mongo = MongoDBClient()


if __name__ == '__main__':
    import asyncio

    async def check():
        await mongo.connect()
        print(await mongo.database.list_collection_names())
        await mongo.disconnect()


    asyncio.run(check())