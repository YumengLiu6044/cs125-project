# Steps to run
## Backend
- Install required .env file in the root of backend:

  ```.env
  MONGO_DB_URI=...
  MONGO_DB_DATABASE_NAME=...
  
  MAIL_USERNAME=...
  MAIL_PASSWORD=...

  # Base64 encoded secret strings
  SESSION_SECRET=...
  JWT_SECRET_KEY=...
  ```
  
- Create and activate Python virtual environment
- In the backend folder, run `pip install -r requirements.txt`
- After installing dependencies, run `uvicorn app:app` to start the backend at the default port

## Frontend
- Install required .env file in the root of frontend:
  
  ```.env
  EXPO_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
  ```
- Setup expo development environment using this [guide](https://docs.expo.dev/get-started/set-up-your-environment/).

## Preprocessing
- Download the [dataset](https://huggingface.co/datasets/datahiveai/recipes-with-nutrition) into the preprocessing folder
- Install the required Python dependencies (pandas, tqdm, pymongo)
- Install the required .env file under the preprocessing folder:
```.env
MONGO_DB_URI=...
```
- Run `sample.py` to create a sampled csv file
- Run `upload.py` to upload the sampled csv file to MongoDB
- Run `analysis.py` to create a JSON document containing all possible categorical values
