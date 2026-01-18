import pandas as pd
import json
from tqdm import tqdm
from pymongo.mongo_client import MongoClient
import dotenv
dotenv.load_dotenv("../backend/.env")
import os

uri = os.getenv("MONGO_DB_URI")
# Create a new client and connect to the server
client = MongoClient(uri)
database = client["cook-book-db"]
collection = database["recipes"]


# ------------------------------
# Parameters
# ------------------------------
CSV_FILE = "recipes-with-nutrition-sample.csv"
BATCH_SIZE = 200  # Firestore write batch limit
JSON_FIELDS = [
    "diet_labels",
    "health_labels",
    "cautions",
    "cuisine_type",
    "meal_type",
    "dish_type",
    "ingredient_lines",
    "ingredients",
    "total_nutrients",
    "daily_values",
    "digest"
]
IGNORE_COLS = [
    "total_nutrients",
    "digest",
    "ingredient_lines"
]

# ------------------------------
# Helper function to parse JSON fields
# ------------------------------
def parse_json_field(field):
    if pd.isna(field):
        return None
    try:
        return json.loads(field.replace("''", '"'))
    except Exception:
        return field  # fallback: keep string if parsing fails


# ------------------------------
# Load CSV with pandas
# ------------------------------
df = pd.read_csv(CSV_FILE, encoding="utf-8")

processed_rows = []

for _, row in tqdm(df.iterrows(), total=len(df)):
    row_dict = row.to_dict()

    # Parse JSON fields
    for col in JSON_FIELDS:
        if col in row_dict:
            row_dict[col] = parse_json_field(row_dict[col])

    # Add fields
    row_dict["recipe_name_lower"] = row_dict["recipe_name"].lower()

    # Remove ignore fields
    for col in IGNORE_COLS:
        row_dict.pop(col, None)

    processed_rows.append(row_dict)

    if len(processed_rows) >= BATCH_SIZE:
        collection.insert_many(processed_rows)
        processed_rows = []


client.close()
