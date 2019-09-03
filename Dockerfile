FROM debian:buster-slim

LABEL maintainer "Alexander Pashuk <alexander.pashuk@xpansa.com>"
LABEL description "Nginx + uWSGI + Flask based Debian Buster and managed by Supervisord"

# Configure locales (for Click python module)
# ENV LC_ALL C.UTF-8
# ENV LANG C.UTF-8

RUN apt-get update && apt-get install -y nginx \
    python3 \
    python3-dev \
    python3-pip \
    uwsgi \
    supervisor \
    uwsgi-plugin-python3 \
 && apt-get clean \
 && apt-get autoremove \
 && rm /etc/nginx/sites-enabled/default \
 && rm -rf /var/lib/apt/lists/*

# Copy Nginx configs and enable API
COPY ./docker/app.conf /etc/nginx/sites-available/app.conf
RUN ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled

# Supervisor configuration files
COPY ./docker/supervisor.conf /etc/supervisor/conf.d/

# Copy app
COPY ./ /opt/app/

WORKDIR /opt/app

# Install requirements
RUN pip3 install -r requirements.txt

EXPOSE 80

CMD /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
