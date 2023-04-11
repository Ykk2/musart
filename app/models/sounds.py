from .db import db

class Sound(db.Model):
    __tablename__ = "sounds"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    composer = db.Column(db.String(80), nullable=False)
    year = db.Column(db.Integer)
    description = db.Column(db.String(300), nullable=False, unique=True)

    def to_json(self):
        return {key: value for key, value in vars(self).items()}
