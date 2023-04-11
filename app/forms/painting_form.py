from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, Regexp, NumberRange
from datetime import datetime

class PaintingForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Please enter the name of the painting"),
                                           Length(max=80, message="Name must be 80 characters or less"),
                                           Regexp('^[a-zA-Z]+$', message="Name can only contain letters")])

    painter = StringField('painter', validators=[DataRequired("Please enter the painter's name"),
                                                 Length(max=80, message="Name must be 80 characters or less"),
                                                 Regexp('^[a-zA-Z]+$', message="Name can only contain letters")])

    year = IntegerField('year', validators=[NumberRange(min=1, max=datetime.datetime.now().year, message='Please enter a valid year')])

    description = StringField('description', validators=[DataRequired("Please enter a description of the painting"),
                                                         Length(max=10000, message="Description must be 10000 characters or less")])
