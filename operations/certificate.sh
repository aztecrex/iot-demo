#! /usr/bin/env bash

cd $(dirname ${0})

op=update
if [ "$1" == "create" ]; then op=create; shift; fi

key="notreally"
value="1039402.super.com"

aws cloudformation "${op}-stack" \
    --stack-name iot-demo-certificate-dns \
    --template-body file://certificate.yaml \
    --parameters \
        ParameterKey=Key,ParameterValue=${key} \
        ParameterKey=Value,ParameterValue=${value}
