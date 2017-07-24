/**
 * Created by pomy on 12/01/2017.
 * filter files by user input
 */

'use strict';

let match = require('minimatch');
let evaluate = require('./eval');

module.exports = function (filters,files,data,done) {
    if (!filters) {
        return done();
    }

    let filePaths = Object.keys(files);

    if(!filePaths.length) {
        return done();
    }

    Object.keys(filters).forEach(function (regexp) {
        filePaths.forEach(function (path) {
            if (match(path, regexp, { dot: true })) {
                let matchedVal = filters[regexp];

                if(!evaluate(matchedVal,data)){
                    delete files[path];
                }
            }
        });
    });

    done();
};
