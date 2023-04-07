from flask_wtf import FlaskForm
from wtforms.fields import (StringField)
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField("comment", validators=[DataRequired()])
