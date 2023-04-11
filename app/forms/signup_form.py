from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ..models import User


def email_exists(form, field):
    email = field.data

    if User.query.filter_by(email=email).first():
        raise ValidationError('This email is already registered.')


def username_exists(form, field):
    username = field.data

    if User.query.filter_by(username=username).first():
        raise ValidationError('This username is already registered.')


def password_validator(form, field):
    policy = form.policy
    password = field.data

    if len(field.data) < policy['length']:
        raise ValidationError(f"Password must be at least {policy['length']} characters long.")

    if policy['uppercase'] and not any(char.isupper() for char in password):
        raise ValidationError("Password must contain at least one uppercase letter.")

    if policy['number'] and not any(char.isdigit() for char in password):
        raise ValidationError("Password must contain at least one number.")

    if policy['special'] and not any(not char.isalnum() for char in password):
        raise ValidationError("Password must contain at least one special character.")


class SignUpForm(FlaskForm):

    password_policy = {
        "length": 8,
        "uppercase": 1,
        "number": 1,
        "special": 1
    }

    username = StringField('username', validators=[DataRequired, username_exists])
    email = StringField('email', validators=[DataRequired, email_exists])
    password = StringField('password', validators=[DataRequired, password_validator])
