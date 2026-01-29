import pathlib
from dotenv import load_dotenv
from fastapi_mail import ConnectionConfig
from jinja2 import Environment, FileSystemLoader, select_autoescape

load_dotenv()

from enum import Enum
import os

FRONTEND_URL = "cookbook://"

DATABASE_URL = os.getenv("MONGO_DB_URI")
DATABASE_NAME = "cook-book-db"

class COLLECTIONS(str, Enum):
    USERS = "users"

# JWT Config
JWT_TOKEN_EXPIRATION = 60 # The expiration time in minutes
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = "HS256"


class JwtTokenScope:
    auth = "auth"
    password_reset = "password_reset"


# Email Config
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_SERVER = "smtp.gmail.com"

MAIL_CONFIG = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_SERVER=MAIL_SERVER,
    MAIL_PORT=587,
    MAIL_FROM=MAIL_USERNAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

ASSET_PATH = pathlib.Path("./assets")
jinja_env = Environment(
    loader=FileSystemLoader(ASSET_PATH),
    autoescape=select_autoescape(["html", "xml"])
)
TEMPLATE_NAME = "email_template.html"
COMMON_TEMPLATE_VARIABLES = {
    "company_name": "Cook Book",
    "expiry_minutes": JWT_TOKEN_EXPIRATION,
}
PASSWORD_RESET_TEMPLATE = f"{FRONTEND_URL}reset-password?token={{}}"

SESSION_SECRET = os.getenv("SESSION_SECRET")