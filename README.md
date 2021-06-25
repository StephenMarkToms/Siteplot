![Well](documentation\logo.jpg)

## Project Setup

1. Clone the repository:

```bash
$ git clone https://github.com/StephenMarkToms/Siteplot.git
```

2. Create a .env file in the root of the project with the following information (found in example.env)

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:k+r7Y/uI9ivl+MTiDWInYEpFxnWIJQmd/ClnxleUhY4=
APP_DEBUG=true
APP_URL=http://Siteplot.test

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=siteplot
DB_USERNAME=root
DB_PASSWORD=root

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

```

3. For a first installation run the following commands:

```bash
# install dependencies
$ npm install

# install all submodules
$ composer install
```

4. To run do the following:

```bash
# install dependencies
$ php artisan serve

# install all submodules
$ npm run watch
```