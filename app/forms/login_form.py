from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ..models import User


def user_exists(form, field):
    email_or_username = field.data
    user = User.query.filter((User.email == email_or_username) | (User.username == email_or_username)).first()

    if not user:
        raise ValidationError("Invalid credentials")


def password_matches(form, field):
    password = field.data
    email_or_username = form.data['email_or_username']
    user = User.query.filter((User.email == email_or_username) | (User.username == email_or_username)).first()

    if not user.check_password(password):
        raise ValidationError("Invalid credentials")


class LoginForm(FlaskForm):
    email_or_username = StringField('email_or_username', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired("Please enter your password."), password_matches])
