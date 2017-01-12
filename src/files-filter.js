/**
 * Created by pomy on 12/01/2017.
 * filter files by user input
 */

'use strict';

let match = require('minimatch');

module.exports = function (filters,files,data,done) {
    if (!filters) {
        return done();
    }

    let filePaths = Object.keys(files);

    Object.keys(filters).forEach(function (regexp) {
        filePaths.forEach(function (path) {
            if (match(path, regexp, { dot: true })) {
                let matchedVal = filters[regexp];

                if(!data[matchedVal]){
                    delete files[path];
                }
            }
        });
    });

    done();
};
