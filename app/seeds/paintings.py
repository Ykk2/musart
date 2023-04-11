from app.models import db, Like, environment, SCHEMA

def seed_likes():

    likes = [
        {
            "user_id": 1,
            "video_id": 1,
            "liked": "neutral"
        },
        {
            "user_id": 2,
            "video_id": 1,
            "liked": "neutral"
        },
        {
            "user_id": 3,
            "video_id": 2,
            "liked": "neutral"
        },
        {
            "user_id": 4,
            "video_id": 2,
            "liked": "neutral"
        },
        {
            "user_id": 5,
            "video_id": 2,
            "liked": "neutral"
        },
        {
            "user_id": 6,
            "video_id": 3,
            "liked": "neutral"
        },
        {
            "user_id": 2,
            "video_id": 3,
            "liked": "neutral"
        }
    ]


    for like in likes:
        new_likes = Like(
            user_id = like['user_id'],
            video_id = like['video_id'],
        )
        db.session.add(new_likes)

    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
