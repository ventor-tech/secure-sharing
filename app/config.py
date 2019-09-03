"""This module includes all things related to app config"""
import os

from dotenv import load_dotenv
from redis import Redis
from fakeredis import FakeRedis


# Load secure configuration parameters
load_dotenv()


class BaseConfiguration(object):
    """Class with common configuration variables"""
    DEBUG = False
    DEV = False
    FLASK_DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    REDIS_URL = os.environ.get('REDIS_URL')
    REDIS_PROVIDER = Redis


class ProdConfiguration(BaseConfiguration):
    """Class with production config variables"""
    pass


class DevConfiguration(BaseConfiguration):
    """Class with dev config variables"""
    DEV = True
    DEBUG = True


class TestConfiguration(BaseConfiguration):
    """Class with testing config variables"""
    TESTING = True
    DEBUG = False
    REDIS_PROVIDER = FakeRedis
