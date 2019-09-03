import pytest

from app import create_app


@pytest.fixture
def app(monkeypatch):
    monkeypatch.setenv('CONFIG', 'app.config.TestConfiguration')
    app = create_app()
    yield app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
