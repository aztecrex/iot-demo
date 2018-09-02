#!/usr/bin/env bash

# Submit sources to pipeline for build and deploy.
# Performs S3 upload without AWS CLI due to Jenkins restrictions

s3Bucket="operations-pipeline-sourcestore-193unl36agvd0"
fileName="frontend-master.zip"

date=`date +%Y%m%d`
dateFormatted=`date -R`
relativePath="/${s3Bucket}/${fileName}"
contentType="application/octet-stream"
stringToSign="PUT\n\n${contentType}\n${dateFormatted}\n${relativePath}"
signature=`echo -en ${stringToSign} | openssl sha1 -hmac ${AWS_SECRET_ACCESS_KEY} -binary | base64`
curl -X PUT -T "${fileName}" \
    -H "Host: ${s3Bucket}.s3.amazonaws.com" \
    -H "Date: ${dateFormatted}" \
    -H "Content-Type: ${contentType}" \
    -H "Authorization: AWS ${AWS_ACCESS_KEY_ID}:${signature}" \
    http://${s3Bucket}.s3.amazonaws.com/${fileName}
