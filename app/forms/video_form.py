from flask_wtf import FlaskForm
from wtforms.fields import (StringField)
from wtforms.validators import DataRequired

class VideoForm(FlaskForm):
    # video_url = StringField("video_url",[DataRequired()])
    title = StringField("title",validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    # preview_image = StringField("preview_image")
