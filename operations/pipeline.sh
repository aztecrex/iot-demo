#! /usr/bin/env bash

cd "$(dirname "${0}")"

op=update
if [ "$1" == "create" ]; then op=create; shift; fi

ptoken="notreallyatoken"

if [ "$1" != "" ]; then
    prepo="ParameterKey=GithubToken,ParameterValue=${1}"
    shift
else
    prepo="ParameterKey=GithubToken,UsePreviousValue=true"
fi

aws cloudformation "${op}-stack" \
    --stack-name iot-demo-pipeline \
    --template-body file://pipeline.yaml \
    --capabilities CAPABILITY_IAM \
    --parameters "$prepo"
