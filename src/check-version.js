/**
 * Created by pomy on 18/01/2017.
 * check the cli version
 */

'use strict';

let semver = require('semver');
let chalk = require('chalk');
let axios = require('axios');
let ora = require('ora');

let pkg = require('../package.json');
let log = require('./log');

log.tips();

module.exports = function (done) {

    let spinner = ora({
        text: "checking chare cli version...",
        color:"blue"
    }).start();

    if (!semver.satisfies(process.version, pkg.engines.node)) {
        spinner.text = chalk.white('chare cli:checking chare cli version failed, error message as follows:');
        spinner.fail();

        log.tips();
        log.error(`  You must upgrade node to ${pkg.engines.node} to use chare cli`);
    }

    axios({
        url: 'https://registry.npmjs.org/chare',
        method: 'get',
        timeout: 7000
    }).then((res) => {
        if(res.status === 200){
            spinner.text = chalk.green('Checking chare cli version success.');
            spinner.succeed();

            let local = pkg.version;
            let latest = res.data['dist-tags'].latest;

            if (semver.lt(local, latest)) {
                log.tips();
                log.tips(chalk.blue('  A newer version of chare cli is available.'));
                log.tips();
                log.tips(`  latest:    ${chalk.green(latest)}`);
                log.tips(`  installed:    ${chalk.red(local)}`)
                log.tips(`  update chare latest: npm update -g chare`);
                log.tips();
            }
            done();
        }
    }).catch((err) => {
        if(err){
            let res = err.response;

            spinner.text = chalk.white('chare cli:checking chare cli version failed, error message as follows:');
            spinner.fail();

            log.tips();
            log.error(`     ${res.statusText}: ${res.data.message}`);
        }
    });
};
