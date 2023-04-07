from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
        {
            'username': 'Demo Channel',
            "email": 'user1@aa.io',
            "first_name": 'Demo',
            "last_name": 'Lee',
            "password": 'password'
        },
        {
            "username": 'Joe Channel',
            "email": 'user2@aa.io',
            "first_name": 'Joe',
            "last_name": 'Doe',
            "password": 'password'
        },
        {
            "username": 'Jane Channel',
            "email": 'user3@aa.io',
            "first_name": 'Jane',
            "last_name": 'Doe',
            "password": 'password'
        },
        {
            "username": 'David Channel',
            "email": 'user4@aa.io',
            "first_name": 'David',
            "last_name": 'Doe',
            "password": 'password'
        },
        {
            "username": 'Andrew Channel',
            "email": 'user5@aa.io',
            "first_name": 'Andrew',
            "last_name": 'Doe',
            "password": 'password'
        },
        {
            "username": 'Jeff Channel',
            "email": 'user6@aa.io',
            "first_name": 'Jeff',
            "last_name": 'Doe',
            "password": 'password'
        },
    ]

    for user in users:
        new_user = User(
            username = user['username'],
            email = user['email'],
            first_name = user["first_name"],
            last_name = user["last_name"],
            password = user['password']
        )
        db.session.add(new_user)

    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
