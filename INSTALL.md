# Installation

Installation includes three simple steps.

1. Generate new certificate for app with LetsEncrypt:

```
chmod +x letsencrypt.sh
./letsencrypt.sh
```

2. Modify configuration files. 

* Copy `.env.example` file to `.env` and change parameters if needed (do not forget to change `SECRET_KEY`!).
* 

3. Build and run container

```
docker-compose build && docker-compose up -d
```

1. Add monthly crontab to update certificates (LetsEncrypt issues certificates for only 90 days).
Optionally, it is possible to create custom cron to update certificates every two monthes.

```
chmod +x <directory_with_project>/letsencrypt.sh
ln -s <directory_with_project>/letsencrypt.sh /etc/cron.monthly
chmod +x /etc/cron.monthly/letsencrypt.sh
```