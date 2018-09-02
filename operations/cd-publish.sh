#!/usr/bin/env bash

set -e

aws s3 cp \
    --recursive \
    --cache-control 'max-age=31536000' \
    --exclude index.html \
    ./build \
    s3://operations-area-frontend-websiteorigin-1rtgo36nz66i0/

aws s3 cp \
    --cache-control 'max-age=900,s-maxage=30' \
    ./build/index.html \
    s3://operations-area-frontend-websiteorigin-1rtgo36nz66i0/

