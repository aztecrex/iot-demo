#! /usr/bin/env bash

cd $(dirname ${0})

op=update
if [ "$1" == "create" ]; then op=create; shift; fi

key="_4bdf90b3483a79500c89abb0689fd187.iot-demo"
value="_c37102b06d05ea41ebb1bd703f21ab9d.tljzshvwok.acm-validations.aws"

aws cloudformation "${op}-stack" \
    --stack-name iot-demo-certificate-dns \
    --template-body file://certificate.yaml \
    --parameters \
        ParameterKey=Key,ParameterValue=${key} \
        ParameterKey=Value,ParameterValue=${value}
