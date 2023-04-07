from app.models import db, Comment, environment, SCHEMA

def seed_comments():

    comments = [
        {
            "user_id": 1,
            "video_id": 1,
            "comment": "comment for video 1 by user 1"
        },
        {
            "user_id": 2,
            "video_id": 1,
            "comment": "comment for video 1 by user 2"
        },
        {
            "user_id": 3,
            "video_id": 1,
            "comment": "comment for video 1 by user 3"
        },
        {
            "user_id": 4,
            "video_id": 2,
            "comment": "comment for video 2 by user 4"
        },
        {
            "user_id": 5,
            "video_id": 2,
            "comment": "comment for video 2 by user 5"
        },
        {
            "user_id": 6,
            "video_id": 2,
            "comment": "comment for video 2 by user 6"
        }
    ]

    for comment in comments:
        new_comment = Comment(
            user_id = comment['user_id'],
            video_id = comment['video_id'],
            comment = comment['comment']
        )
        db.session.add(new_comment)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
