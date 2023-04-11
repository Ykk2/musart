from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .paintings import seed_likes, undo_likes
from .subscribers import seed_subscribers, undo_subscribers
from .sounds import seed_videos, undo_videos

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_subscribers()
        undo_likes()
        undo_comments()
        undo_videos()
        undo_users()
    seed_users()
    seed_videos()
    seed_comments()
    seed_likes()
    seed_subscribers()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_subscribers()
    undo_likes()
    undo_comments()
    undo_videos()
    undo_users()
