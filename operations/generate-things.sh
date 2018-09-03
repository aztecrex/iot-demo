#/usr/bin/env bash

namespace="$1"

set -e

if [ "$namespace" == "" ]; then
    echo namespace needed
    exit 1
fi



genPresentationData() {
    local name="${namespace}_${1}"
    echo updateing "$name"
    local pl='{
    "state": {
        "reported": {},
        "desired": {
            "page": 1,
            "powered": false
        }
    }
}'
    # echo "$pl"

    aws iot-data update-thing-shadow \
            --thing-name "$name" \
            /dev/stdout \
            --payload "$pl" \


}

genRingData() {
    local name="${namespace}_${1}"
    echo updateing "$name"
    local pl='{
    "state": {
        "reported": {},
        "desired": {
            "lamps": [
                {
                    "index":0,
                    "color": "ffff00"
                }
            ],
            "powered": false,
            "effect": "none"
        }
    }
}'
    aws iot-data update-thing-shadow \
            --thing-name "$name" \
            /dev/stdout \
            --payload "$pl" \


}

createThing() {
    local name="${namespace}_${1}"
    aws iot create-thing --thing-name "$name"
}

createThing Presentation
genPresentationData Presentation
createThing Ring0
genRingData Ring0

