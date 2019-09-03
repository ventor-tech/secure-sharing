"""App routes"""
from flask import Blueprint, render_template, redirect, url_for


app_routes = Blueprint(
    'app_routes',
    __name__,
    template_folder='templates'
)


@app_routes.route('/')
def index():
    """
    Render main page with form
    """
    return render_template('index.html')


@app_routes.route('/<path:path>')
def redirect_to_index(path=None):
    print('redirect to root')
    return redirect(url_for('app_routes.index'))
