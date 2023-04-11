from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Video, Comment, subscribers, Like, User


subscriber_routes = Blueprint("subscribers", __name__)

@subscriber_routes.route("/")
@login_required
def subscribed_list():
    user = User.query.get(current_user.id)
    list = user.subscribed.all()
    return {'subscribed' :[channel.to_dict() for channel in list]}


@subscriber_routes.route("/<int:userId>", methods=['POST'])
@login_required
def subscribe(userId):

    subscriber = User.query.get(current_user.id)
    user = User.query.get(userId)

    if (user.subscribers.filter(subscribers.c.subscriber_id == current_user.id).first()):
        return { "error": "User is already following this user"}

    user.subscribers.append(subscriber)

    db.session.commit()

    return {"message": "Succesfully subscribed",
            "user": user.to_dict()}


@subscriber_routes.route("/<int:userId>", methods=['DELETE'])
@login_required
def unsubscribe(userId):

    subscriber = User.query.get(current_user.id)
    user = User.query.get(userId)

    if (not user.subscribers.filter(subscribers.c.subscriber_id == current_user.id).first()):
        return { "error": "User does not follow this user yet"}

    user.subscribers.remove(subscriber)
    db.session.commit()

    return {'message': "Succesfully unsubscribed"}
