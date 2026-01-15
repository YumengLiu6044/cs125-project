import os
from pathlib import Path
import csv
import random
from tqdm import tqdm

PERCENTAGE = 0.1

original_file_path = Path("recipes-with-nutrition.csv")
resampled_file_path = Path("recipes-with-nutrition-sample.csv")

if not original_file_path.exists():
    print("File not found")
    exit(1)

if resampled_file_path.exists():
    os.remove(resampled_file_path)

with open(original_file_path, "r") as input_file:
    with open(resampled_file_path, "w") as output_file:
        reader = csv.reader(input_file)
        writer = csv.writer(output_file)

        # Write first row
        header = next(reader)
        writer.writerow(header)

        # Randomly write rows
        for input_row in tqdm(reader):
            if random.random() < PERCENTAGE:
                writer.writerow(input_row)
