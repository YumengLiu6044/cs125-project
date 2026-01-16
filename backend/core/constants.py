import os
import dotenv
dotenv.load_dotenv()

DATABASE_URL = os.getenv("MONGO_DB_URI")
DATABASE_NAME = "cook-book"