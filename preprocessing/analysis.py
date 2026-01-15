import pandas as pd
import ast
import json

df = pd.read_csv("recipes-with-nutrition-sample.csv")

label_columns = [
    "diet_labels", "health_labels", "cautions", "cuisine_type",
    "meal_type", "dish_type",
]
label_value_dict = {}

for column in label_columns:
    val_set = set()

    for row in df[column]:
        arr = ast.literal_eval(row)
        for label in arr:
            val_set.add(label)

    label_value_dict[column] = list(val_set)

with open("label_value_dict.json", "w") as f:
    json.dump(label_value_dict, f, indent=2)
