import hashlib
import time

from app.extensions import redis
from app.models.controller import EncryptionController


def test_encryption_with_empty_message():
    """
    Test if encryption return error to request with no message
    """
    try:
        EncryptionController.encrypt('')
        raise Exception('ValueError exception not raised')
    except ValueError:
        pass


def test_encryption(client):
    """
    Test if encryption return data in correct format
    """
    key = EncryptionController.encrypt('Hello world.')

    assert key is not None

    # Check if there is hash-table with specified key
    key_hash = hashlib.sha256(key).hexdigest()

    # Try to find data in Redis by key hash
    data = redis.hgetall(key_hash)

    assert data is not None
    assert b'nonce' in data
    assert b'ciphertext' in data
    assert b'tag' in data


def test_encryption_with_positive_ttl(client):
    """
    Test if encryption return data in correct format
    """
    key = EncryptionController.encrypt('Hello world.', 5)

    assert key is not None

    # Check if there is hash-table with specified key
    key_hash = hashlib.sha256(key).hexdigest()

    # Try to find data in Redis by key hash
    data = redis.hgetall(key_hash)

    assert data is not None
    assert b'nonce' in data
    assert b'ciphertext' in data
    assert b'tag' in data

    # Check expiration time
    assert redis.ttl(key_hash) > 0

    # Wait until key should expire
    time.sleep(5)

    data = redis.hgetall(key_hash)

    # redis.hgetall() returns empty dict when key not exists
    assert data == dict()


def test_encryption_with_negative_ttl(client):
    """
    Test if encryption return data in correct format
    """
    key = EncryptionController.encrypt('Hello world.', -1)

    assert key is not None

    # Check if there is hash-table with specified key
    key_hash = hashlib.sha256(key).hexdigest()

    # Try to find data in Redis by key hash
    data = redis.hgetall(key_hash)

    assert data is not None
    assert b'nonce' in data
    assert b'ciphertext' in data
    assert b'tag' in data

    # Check expiration time
    assert redis.ttl(key_hash) == -1


def test_decryption_with_wrong_key():
    """
    Test if encryption return error to request with empty message
    """
    message = EncryptionController.decrypt('1234567890')

    assert message is None


def test_decryption(client):
    """
    Test if decryption return correct data in correct format
    """
    # Encrypt data
    message = 'Hello world.'
    key = EncryptionController.encrypt(message)
    decrypted_message = EncryptionController.decrypt(key)

    assert decrypted_message == message
