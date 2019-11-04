# Django Redis Memcached For Tenant Base
For this exercise you will be creating a key-value storage server that speaks a small subset of
the memcached protocol and persists data in SQLite. It should also have an HTTP server
running out of the same process for monitoring. The monitoring page should include some basic
Javascript interactivity.

## Redis workflow
```json
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
redis-cli
redis-cli ping

```


## Backend development workflow

```json
virtualenv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## Frontend development workflow

```json
npm i
npm start
```

## For deploying

```json
npm run build
```
