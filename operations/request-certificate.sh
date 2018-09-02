#! /usr/bin/env bash

# Do not run this unless the certificate disappears.

aws acm request-certificate \
    --domain-name iot-demo.banjocreek.io \
    --validation-method DNS


    # --domain-validation-options \
    #      DomainName=iot-demo.banjocreek.io,ValidationDomain=banjocreek.io

