from .db import db, environment, SCHEMA, add_prefix_for_prod

subscribers = db.Table(
    "subscribers",
    db.Column("user_id",db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("subscriber_id",db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True)
)

if environment == 'production':
    subscribers.schema = SCHEMA
