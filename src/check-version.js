/**
 * Created by pomy on 18/01/2017.
 * check the cli version
 */

'use strict';

let semver = require('semver');
let chalk = require('chalk');
let pkg = require('../package.json');
let axios = require('axios');

let log = require('./log');

module.exports = function (done) {

    if (!semver.satisfies(process.version, pkg.engines.node)) {
        log.error(`  You must upgrade node to >= ${pkg.engines.node} to use chare-cli`);
    }

    axios({
        url: 'https://registry.npmjs.org/chare',
        method: 'get'
    }).then((res) => {
        if(res.status === 200){
            done();
        }
    }).catch((err) => {
        if(err){
            let res = err.response;
        }
    });
};
