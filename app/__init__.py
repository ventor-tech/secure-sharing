"""Init module"""
import os

from flask import Flask


def create_app():
    """
        Initialize Flask app
    """
    app = Flask(__name__)

    app.config.from_object(
        os.environ.get('CONFIG') or 'app.config.ProdConfiguration'
    )

    # Initialize extensions
    from app.extensions import redis

    # Set Redis Provider. Needed to add ability to use different providers
    # if required and to simplify testing. By default it is redis.Redis.
    redis.provider_class = app.config['REDIS_PROVIDER']
    redis.init_app(app)

    # Register blueprints
    from app.views.app import app_routes
    from app.views.api import api_routes

    app.register_blueprint(app_routes)
    app.register_blueprint(api_routes, url_prefix='/api')

    return app
