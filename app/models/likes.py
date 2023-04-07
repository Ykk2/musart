from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')), nullable=False)
    liked = db.Column(db.String, default="neutral")

    users = db.relationship('User', back_populates='likes')
    videos = db.relationship('Video', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'videoId': self.video_id,
            'liked': self.liked
        }
