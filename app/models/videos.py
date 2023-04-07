from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import current_user



class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    video_url = db.Column(db.String(1000), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    total_views = db.Column(db.Integer, default=0)
    preview_image = db.Column(db.String(1000), default="none")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    users = db.relationship("User", back_populates="videos")
    comments = db.relationship('Comment', back_populates='videos', cascade='all, delete')
    likes = db.relationship('Like', back_populates='videos', cascade='all, delete')



    def to_dict(self):

        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'videoUrl': self.video_url,
            'title': self.title,
            'description': self.description,
            'totalViews': self.total_views,
            'previewImage': self.preview_image,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'user': self.users.to_dict(),
            'likes': len([likes.liked for likes in self.likes if likes.liked == 'liked']),
        }

    def to_dict_after_login(self):

        if (len([likes.liked for likes in self.likes if likes.user_id == current_user.id]) > 0):
            userLiked = [likes.liked for likes in self.likes if likes.user_id == current_user.id][0]
        else:
            userLiked = "none"

        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'videoUrl': self.video_url,
            'title': self.title,
            'description': self.description,
            'totalViews': self.total_views,
            'previewImage': self.preview_image,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'user': self.users.to_dict(),
            'likes': len([likes.liked for likes in self.likes if likes.liked == 'liked']),
            'userLiked': userLiked
        }
