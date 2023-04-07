from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    users = db.relationship('User', back_populates='comments')
    videos = db.relationship('Video', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'videoId': self.video_id,
            'comment': self.comment,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            "user": self.users.to_dict()
        }
