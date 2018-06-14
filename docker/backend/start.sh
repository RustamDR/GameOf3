#!/bin/bash

cd /var/www

npm install

npm run build

exec npm run watch
