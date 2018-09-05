'use strict';

const bundler = require('lambundaler');

bundler({
        entry: 'presentation.js',
        export: 'handle',
        output: 'build/presentation.zip',
        exclude: ['aws-sdk']
    }, (err, buffer, artifacts) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("bundled: 'presentation.zip'");
});

