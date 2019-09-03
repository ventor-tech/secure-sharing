# Secure Sharing

Secure Sharing is a service to secure share sensitive information through one-time links. 

## Development 

```bash
uwsgi --ini app.ini
```

### Generate certificate for `localhost`

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```


## Run tests

```bash
pytest
```

To see report

```bash
coverage run -m pytest
coverage report
```