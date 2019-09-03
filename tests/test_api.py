import json


def test_encryption_without_message(client):
    """
    Test if encryption return error to request with no message
    """
    response = client.post(
        '/api/encrypt',
        data=json.dumps({}),
        content_type='application/json'
    )

    assert 'error' in response.json
    assert 'No message specified' == response.json['error']


def test_encryption_with_empty_message(client):
    """
    Test if encryption return error to request with empty message
    """
    response = client.post(
        '/api/encrypt',
        data=json.dumps({'message': ''}),
        content_type='application/json'
    )

    assert 'error' in response.json
    assert 'No message specified' == response.json['error']


def test_encryption(client):
    """
    Test if encryption return data in correct format
    """
    response = client.post(
        '/api/encrypt',
        data=json.dumps({'message': 'Hello World.'}),
        content_type='application/json'
    )

    assert 'key' in response.json


def test_decryption_with_wrong_key(client):
    """
    Test if encryption return error to request with empty message
    """
    response = client.get('/api/decrypt/12345678')

    assert 'error' in response.json
    assert 'This message is not available' == response.json['error']


def test_decryption(client):
    """
    Test if decryption return correct data in correct format
    """
    # Encrypt data
    response = client.post(
        '/api/encrypt',
        data=json.dumps({'message': 'Hello World.'}),
        content_type='application/json'
    )

    key = response.json['key']
    message = 'Hello World.'

    response = client.get('/api/decrypt/{}'.format(key))

    assert 'message' in response.json
    assert response.json['message'] == message
