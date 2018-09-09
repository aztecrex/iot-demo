'use strict';

const bundler = require('lambundaler');

bundler({
        entry: 'presentation.js',
        export: 'handle',
        output: 'lambda-build/presentation.zip',
        exclude: ['aws-sdk']
    }, (err, buffer, artifacts) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("bundled: 'presentation.zip'");
});

bundler({
    entry: 'controller.js',
    export: 'handle',
    output: 'lambda-build/controller.zip',
    exclude: ['aws-sdk']
}, (err, buffer, artifacts) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("bundled: 'controller.zip'");
});

