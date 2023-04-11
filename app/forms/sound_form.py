from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, Regexp, NumberRange
from datetime import datetime

class SoundForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Please enter the name of the painting"),
                                           Length(max=150, message="Name must be 150 characters or less")])

    composer = StringField('composer', validators=[DataRequired("Please enter the composer's name"),
                                                 Length(max=80, message="Name must be 80 characters or less"),
                                                 Regexp('^[a-zA-Z]+$', message="Name can only contain letters")])

    year = IntegerField('year', validators=[NumberRange(min=1, max=datetime.datetime.now().year, message='Please enter a valid year')])

    description = StringField('description', validators=[DataRequired("Please enter a description of the music"),
                                                         Length(max=10000, message="Description must be 10000 characters or less")])
