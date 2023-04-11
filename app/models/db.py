from flask_sqlalchemy import SQLAlchemy
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
db = SQLAlchemy()


def add_prefix_for_prod(column_name):
    """
    helper for adding prefix to FK so postgres doesn't get confused in production.
    """
    if environment == "production":
        return f"{SCHEMA}.{column_name}"
    else:
        return column_name
