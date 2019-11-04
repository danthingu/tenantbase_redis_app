# Django Redis Memcached For Tenant Base
For this exercise I created a "To do List" application using key-value storage server with Redis that speaks a small subset of
the memcached protocol and persists data in SQLite. I also created a React Front End page to monitor the protocol of get/post/put/delete.

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
