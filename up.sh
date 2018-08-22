#!/bin/sh

echo '--- run npm install'
npm install

echo '--- up the docker'
sudo docker-compose up -d
