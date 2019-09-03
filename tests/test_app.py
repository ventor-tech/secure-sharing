from urllib.parse import urlparse

from app import create_app


def test_config(monkeypatch):
    """
    Test that we can pass config and it will be correctly processed
    """
    # By default should not be testing or dev or debug
    assert not (
        create_app().testing or
        create_app().config['DEV'] or
        create_app().debug
    )

    # Should read config path from environment variables
    monkeypatch.setenv('CONFIG', 'app.config.TestConfiguration')
    assert create_app().testing


def test_main_page(client):
    """
    Test that root path working and returns correct phrase
    """
    response = client.get('/', follow_redirects=True)
    assert b'App Loading...' in response.data


def test_redirects(client):
    """
    Test if app redirect to root for any URL
    """
    response = client.get('/hello-world', follow_redirects=False)

    assert response.status_code == 302
    assert urlparse(response.location).path == '/'
