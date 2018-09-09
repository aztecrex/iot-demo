#!/usr/bin/env bash

set -e

origin='iot-demo-frontend-websiteorigin-q7qtqoasc02j'

cd "$(dirname "${0}")/.."

aws s3 cp \
    --recursive \
    --cache-control 'max-age=31536000' \
    --exclude index.html \
    ./build \
    "s3://${origin}/"

aws s3 cp \
    --cache-control 'max-age=900,s-maxage=30' \
    ./build/index.html \
    "s3://${origin}/"


update-runtime() {
    local functionName="$1"
    aws --region us-east-1 lambda update-function-configuration --function-name $functionName --runtime 'nodejs8.10'
}
update-handler() {
    local functionName="$1"
    local handlerName="$2"
    aws --region us-east-1 lambda update-function-configuration  --function-name $functionName --handler $handlerName
}

update-code() {
    local functionName="$1"
    local filename="$2"
    aws --region us-east-1 lambda update-function-code --function-name $functionName --zip-file "fileb://${filename}"
}

update-lambda() {
    local functionName="$1"
    local handlerName="$2"
    local fileName="$3"

    update-runtime $functionName
    update-handler $functionName $handlerName
    update-code $functionName $fileName
}

update-lambda \
    'iot-demo-backend-SlidesButtonFunction-1X4YNKHYEXAK0' \
    'presentation.handle' \
    "./lambda-build/presentation.zip"

update-lambda \
    'iot-demo-backend-PresentationMasterFunction-7I3MS5XU5C4V' \
    'controller.handle' \
    "./lambda-build/controller.zip"

