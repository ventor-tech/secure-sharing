# Installation

Installation of SecureSharing is pretty simple.

## Production

1. You may want to modify configuration file. To do this copy `.env.example`
file to `.env` and change parameters if needed. One required parameter
to change is `SECRET_KEY`.

2. Build and run Docker containers:

**NOTE** Check [this link](https://linuxize.com/post/how-to-install-and-use-docker-on-debian-9/)
to find out how to install Docker on Debian 9.

**NOTE** Check [this link](https://linuxize.com/post/how-to-install-and-use-docker-compose-on-debian-9/) to find out how to install docker-compose on Debian 9.

```bash
docker-compose build && docker-compose up -d
```

3. Configure Nginx proxy.

**NOTE** You're free to use any web server you like.

```bash
apt install nginx
cd /etc/nginx/sites-available
nano secure.conf
```

Insert the following configuration:

```
server {
	listen                80;
	server_name           <your_domain_name>;
	
	location / {
        proxy_pass        http://localhost:8000;
    }
}
```

Remove default configuration and enable app:

```
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/secure.conf /etc/nginx/sites-enabled/
```

1. Generate SSL certificates.

We recommend to use LetsEncrypt to generate valid SSL certificates.

Check [this document](https://certbot.eff.org/lets-encrypt/debianstretch-nginx)
to find out how to install Certbot for Nginx on Debian 9.

Run the following command to automatically generate certificates for `<your_domain_name>`
specified in Nginx configuration:

```bash
certbot --nginx
```

Certbot will update Nginx configuration to redirect from HTTP to HTTPS automatically.
Also it will create cron job to renew certificates automatically before they expired.

## Development 

To run development server locally:

```bash
cd <project_dir>
virtualenv -p python3.7 venv
source venv/bin/activate
pip install -r requirements.txt
pip install uwsgi
uwsgi --ini uwsgi.ini
```

**NOTE** You need Redis server installed somewhere. One options is to run it
locally in Docker:

```bash
docker run -d -p 6379:6379 --name redis redis
```

### Run tests

```bash
pytest
```

To see coverage report

```bash
coverage run -m pytest
coverage report
```