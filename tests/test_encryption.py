from app.models.encryption import Encryption


def test_generate_key_negative_length():
    """
    Test if function raise ValueError exception on negative nbits values
    """
    try:
        Encryption.generate_key(-256)
        raise Exception('ValueError exception not raised')
    except ValueError:
        pass


def test_generate_key_zero_length():
    """
    Test if function raise ValueError exception on zero nbits value
    """
    try:
        Encryption.generate_key(0)
        raise Exception('Exception not raised')
    except ValueError:
        pass


def test_generate_key_positive_length():
    """
    Test if function return key with specified length
    """
    key = Encryption.generate_key(512)

    assert len(key) == 64


def test_encryption():
    """
    Test if decrypted text equal to original text
    """
    text = 'Hello world.'
    key = Encryption.generate_key()
    nonce, ciphertext, tag = Encryption.encrypt_text(key, text)
    decrypted_text = Encryption.decrypt_text(key, nonce, ciphertext, tag)

    assert decrypted_text == text
