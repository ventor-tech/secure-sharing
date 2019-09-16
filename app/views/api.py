from flask import Blueprint, current_app, jsonify, request

from app.models.controller import EncryptionController

api_routes = Blueprint(
    'api_router',
    __name__
)


@api_routes.route('/encrypt/', strict_slashes=False, methods=['POST'])
def encrypt_message():
    message = request.json.get('message', '').strip()
    ttl = request.json.get('ttl', 24*60*60)  # By default store 1 day

    if not message:
        return jsonify({'error': 'No message specified'}), 400

    try:
        key = EncryptionController.encrypt(message, ttl)
    except Exception as err:
        if current_app.config['DEBUG']:
            return jsonify({'error': str(err)}), 500
        else:
            # Do not show details in production mode
            return jsonify({'error': 'Something goes wrong on our side'}), 500

    return jsonify({'key': key.decode('utf-8')}), 200


@api_routes.route('/decrypt/<key>', strict_slashes=False)
def decrypt_message(key):
    message = EncryptionController.decrypt(key)

    if not message:
        return jsonify({'error': 'This message is not available'}), 404

    return jsonify({'message': message}), 200
