#!/usr/bin/env bash

cd "$(dirname "$0")"

op=update
if [ "$1" == "create" ]; then op=create; shift; fi

aws cloudformation "${op}-stack" \
    --stack-name iot-demo-frontend \
    --template-body file://infrastructure-frontend.yaml \
    --capabilities CAPABILITY_IAM
