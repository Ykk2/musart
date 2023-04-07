from app.models import db, subscribers, environment, SCHEMA

def seed_subscribers():

    subscribers_list = [
        {
            "user_id": 1,
            "subscriber_id": 2
        },
        {
            "user_id": 1,
            "subscriber_id": 3
        },
        {
            "user_id": 2,
            "subscriber_id": 1
        },
        {
            "user_id": 3,
            "subscriber_id": 1
        },
        {
            "user_id": 4,
            "subscriber_id": 6
        },
        {
            "user_id": 5,
            "subscriber_id": 3
        }
    ]

    for subscriber in subscribers_list:
        new_follow = subscribers.insert().values(user_id = subscriber['user_id'], subscriber_id = subscriber['subscriber_id'])
        db.session.execute(new_follow)

    db.session.commit()



def undo_subscribers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subscribers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM subscribers")

    db.session.commit()
