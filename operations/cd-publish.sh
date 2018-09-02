#!/usr/bin/env bash

set -e

orign='iot-demo-frontend-websiteorigin-q7qtqoasc02j'

cd "$(dirname "${0}")"

aws s3 cp \
    --recursive \
    --cache-control 'max-age=31536000' \
    --exclude index.html \
    ./build \
    "s3://${origin}/"

aws s3 cp \
    --cache-control 'max-age=900,s-maxage=30' \
    ./build/index.html \
    "s3://${origin}/"
