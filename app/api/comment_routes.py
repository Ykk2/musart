from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Comment
from ..forms import CommentForm

comment_routes = Blueprint("comments", __name__)


#GET ALL COMMENTS FOR A VIDEO
@comment_routes.route("/<int:videoId>")
def get_all_comment(videoId):
    comments_query = Comment.query.filter(Comment.video_id == videoId).all()
    comments = [comment.to_dict() for comment in comments_query]
    return { "comments" : comments}


#CREATE A COMMENT
@comment_routes.route("/<int:videoId>", methods=["POST"])
@login_required
def create_comment(videoId):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit()):
        new_comment = Comment(user_id = current_user.id,
                              video_id = videoId,
                              comment = form.data["comment"])
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return {"error": "Comment did not validate"}





#EDIT A COMMENT
@comment_routes.route("/<int:commentId>", methods=["PUT"])
@login_required
def edit_comment(commentId):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    comment = Comment.query.get(commentId)

    if form.validate_on_submit():
        setattr(comment, "comment", form.data["comment"])

    db.session.commit()

    return comment.to_dict()


#DELETE A COMMENT
@login_required
@comment_routes.route("/<int:commentId>", methods=["DELETE"])
def delete_comment(commentId):

    comment = Comment.query.get(commentId)

    db.session.delete(comment)
    db.session.commit()

    return {"message": "Comment deleted"}
