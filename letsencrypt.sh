#!/bin/sh

mkdir -p {{ proxy_dir }}/www/{{ domain }}

docker pull certbot/certbot:latest

docker run -it --rm --name certbot/certbot:latest \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  --volumes-from secure_sharing \
  certbot/certbot:latest \
  certonly \
  --webroot \
  --webroot-path /var/www/{{ domain }} \
  --agree-tos \
  --renew-by-default \
  -d {{ domain }} \
  -m {{ email }}

docker kill --signal=HUP secure_sharing