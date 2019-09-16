const API = {
    sendRequest: async (url, options) => {
        try {
            const response = await fetch(url, options);
            const json = await response.json();

            // Catch all failed HTTP status codes
            if (!response.ok) {
                throw Error(json['error']);
            }

            return json;
        } catch (err) {
            // This will catch network errors plus errors threw by checking
            // HTTP status code above
            throw Error(err);
        }
    },

    decryptMessage: async function (key) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let resp = await this.sendRequest(`/api/decrypt/${key}`, options);
        return resp['message'];
    },

    encryptMessage: async function (message, ttl) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'message': message,
                'ttl': ttl
            })
        };

        let resp = await this.sendRequest(`/api/encrypt/`, options);
        console.log(resp);
        return resp['key'];
    }
}

export default API;