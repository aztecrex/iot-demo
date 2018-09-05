#!/usr/bin/env bash

set -e

deploySubmitterRole='arn:aws:iam::123972995618:role/deployer-payout-backend-SubmitterRole-ONPUJ5V9QHBU'
deploySubmitTarget='s3://deployer-payout-backend-sourcestore-18f1uxw90hkx9/deployer-payout-backend/artifact.zip'

aws-assume-deploy-submitter() {
  eval "$(aws sts assume-role \
    --role-arn "$deploySubmitterRole" \
    --role-session-name "bootstrap$$" \
    --query \
       'Credentials |
          join (`\n`,
           values({
             AccessKeyId: join(``, [`export AWS_ACCESS_KEY_ID=`,AccessKeyId]),
             SecretAccessKey:join(``, [`export AWS_SECRET_ACCESS_KEY=`,SecretAccessKey]),
             SessionToken:join(``, [`export AWS_SESSION_TOKEN=`,SessionToken])
           }))' \
    --output text)"
}

aws-end-session() {
  eval $(env | sed -En 's/^(AWS_[^=]*)=.*$/unset \1/p')
}



cd "$(dirname "$0")"

rm -rf build

npm run package

zip -r9 artifact \
    *-id \
    *.sh \
    *.yaml

cd build
zip -r9 ../artifact *
cd ..

echo "Pushing artifactto deployer bucket..."
aws-assume-deploy-submitter
env | grep AWS

aws s3 cp artifact.zip "$deploySubmitTarget"
aws-end-session

