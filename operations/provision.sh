#!/usr/bin/env bash

cd "$(dirname "$0")"

aws cloudformation update-stack \
    --stack-name operations-area-frontend \
    --template-body file://deploy/cf-provision.yaml \
    --capabilities CAPABILITY_NAMED_IAM
