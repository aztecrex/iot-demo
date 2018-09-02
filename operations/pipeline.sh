#! /usr/bin/env bash

cd $(dirname ${0})

op=update
if [ "$1" == "create" ]; then op=create; shift; fi

# assume dev environment during rapid dev phase, switch to assume
# production env before completing - gjw 2018-05-24
aws cloudformation update-stack \
    --stack-name operations-pipeline \
    --template-body file://cf-pipeline.yaml \
    --capabilities CAPABILITY_IAM
