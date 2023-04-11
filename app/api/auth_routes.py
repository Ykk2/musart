from flask import Blueprint, request, jsonify
from ..models import User, db
from flask_login import login_required, login_user, logout_user
from .helpers import format_errors
from ..forms import LoginForm, SignUpForm


auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.filter_by(email = form.data['email']).first()
        login_user(user)
        return user.to_json()
    return jsonify(format_errors(form.errors)), 401


@auth_routes.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return '', 204


@auth_routes.route('/signup', methods=['POST'])
def signup():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(username = form.data['username'],
                    email = form.data['email'],
                    password = form.data['password'])

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_json()
    return jsonify(format_errors(form.errors)), 400
