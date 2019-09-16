import secrets

from Cryptodome.Cipher import AES


class Encryption(object):
    """
    This class implements methods to work with AES encryption.

    Can be replaced with different realization.
    """
    @staticmethod
    def generate_key(nbits=256):
        """
        Generates unique key for AES with length nbits.
        """
        if nbits <= 0:
            raise ValueError('nbits should be positive')

        # Function secrets.token_hex(nbytes) generates two hex symbols
        # for each byte from nbytes. We divide number of bytes by 2 to get
        # 32-bytes string required for AES-256.

        # We could use Crypto.Random.get_random_bytes() to generate random
        # sequence of bytes but we need to human-readable key in URL
        return secrets.token_hex(nbits // 8 // 2).encode('utf-8')

    @staticmethod
    def encrypt_text(key, text):
        """
        Encrypts text message with specified key using AES
        """
        # AES.MODE_EAX can be used instead but it a bit slower
        # (because of two-pass scheme).
        cipher = AES.new(key, AES.MODE_GCM)
        nonce = cipher.nonce
        ciphertext, tag = cipher.encrypt_and_digest(text.encode('utf-8'))

        return nonce, ciphertext, tag

    @staticmethod
    def decrypt_text(key, nonce, ciphertext, tag):
        """
        Decrypts encrypted message with specified key and nonce using AES.
        """
        cipher = AES.new(key, AES.MODE_GCM, nonce)
        text = cipher.decrypt_and_verify(ciphertext, tag).decode('utf-8')

        return text
