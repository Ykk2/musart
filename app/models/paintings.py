from .db import db

class Painting(db.Model):
    __tablename__ = "paintings"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    painter = db.Column(db.String(80), nullable=False)
    year = db.Column(db.Integer)
    description = db.Column(db.String(10000), nullable=False, unique=True)

    def to_json(self):
        return {key: value for key, value in vars(self).items()}
