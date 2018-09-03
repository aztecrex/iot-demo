#!/usr/bin/env bash

cd "$(dirname "$0")"

op=update
if [ "$1" == "create" ]; then op=create; shift; fi

userp='ParameterKey=Username,UsePreviousValue=true'
if [ "$1" != "" ]; then
    userp="ParameterKey=Username,ParameterValue=${1}"
    shift
fi
emailp='ParameterKey=EmailAddress,UsePreviousValue=true'
if [ "$1" != "" ]; then
    emailp="ParameterKey=EmailAddress,ParameterValue=${1}"
    shift
fi

aws cloudformation "${op}-stack" \
    --stack-name iot-demo-users \
    --template-body file://infrastructure-users.yaml \
    --capabilities CAPABILITY_IAM \
    --parameters "$userp" "$emailp"

