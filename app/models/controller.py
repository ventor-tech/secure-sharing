import hashlib

from app.extensions import redis
from app.models.encryption import Encryption


# TODO: Rename to EncryptionService?
class EncryptionController(object):
    """
    TODO: Rename class and add description
    """
    def encrypt(message):
        """
        This method takes message, encrypt and place encrypted message
        with parts of key (nonce, ciphertext, tag) into Redis.
        """
        if not message:
            raise ValueError('Message cannot be empty')

        key = Encryption.generate_key()
        nonce, ciphertext, tag = Encryption.encrypt_text(
            key,
            message
        )

        # Save in Redis
        redis.hmset(
            hashlib.sha256(key).hexdigest(),
            {
                'nonce': nonce,
                'ciphertext': ciphertext,
                'tag': tag
            }
        )

        return key

    def decrypt(key):
        """
        This method takes private key and tries to find encrypted message and
        other parts of key in Redis to decrypt message.
        """
        # Key should have bytes type
        if not isinstance(key, bytes):
            key = key.encode('utf-8')

        key_hash = hashlib.sha256(key).hexdigest()

        # Try to find data in Redis by key hash
        data = redis.hgetall(key_hash)

        if not data:
            return None

        # After loading from Redis all keys in key_data will be bytes
        # (despite the fact these values originally was strings)
        message = Encryption.decrypt_text(
            key=key,
            nonce=data[b'nonce'],
            ciphertext=data[b'ciphertext'],
            tag=data[b'tag']
        )

        # If everything goes ok we should delete values from Redis
        redis.delete(key_hash)

        return message
