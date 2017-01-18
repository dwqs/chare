/**
 * Created by pomy on 16/01/2017.
 * check the repos is exists on github.com.
 */

'use strict';

let axios = require('axios');
let ora = require('ora');
let chalk = require('chalk');

let utils = require('../src/utils');
let log = require('./log');

module.exports = function (repo,done){
    let oraer = ora({
        text: 'checking template from github.com...',
        color:"blue"
    }).start();

    let repoInfo = repo.split('/');

    const REQUEST_URL = `https://api.github.com/users/${repoInfo[0]}/repos`;

    axios(utils.getAuthInfo(REQUEST_URL)).then((res) => {
        log.tips();

        if(res.status === 200 && Array.isArray(res.data) && res.data.length){
            let reposName = [];

            res.data.forEach(function (repo) {
                reposName.push(repo.name);
            });

            if(reposName.indexOf(repoInfo[1]) > -1){
                oraer.text = chalk.green('Template checked success from github.com.');
                oraer.succeed();

                log.tips();
                done(repo);
            }
        } else {
            oraer.stop();

            log.tips();
            log.tips(chalk.red(`Template checked fail: ${repo} not found on github.com.`));
            log.tips();
            log.tips(`Please check all available official templates by ${chalk.blue('chare list')} in terminal.`);
            process.exit(1);
        }
    }).catch((err) => {
        let res = err.response;
        if(err){
            oraer.text = chalk.white(`chare cli:checking template ${repo} failed from github.com, error message as follows:`);
            oraer.fail();
            log.tips();

            if(res.status === 403){
                //api rate limit:https://developer.github.com/v3/#rate-limiting
                log.tips(chalk.red(`     ${res.statusText}: ${res.data.message}\n\ndocumentation: ${res.data.documentation_url}`));
                log.tips();
                log.tips(`     Please set auth token to get a higher rate limit by ${chalk.blue('chare token')}. Check out the documentation for more details.`);
                log.tips();
                log.tips('     documentation: https://developer.github.com/v3/auth/#basic-authentication');
                process.exit(1);
            } else {
                log.tips(chalk.red(`     ${res.statusText}: ${res.headers.status}`));
                log.tips();
                log.tips(`Please check all available official templates by ${chalk.blue('chare list')} in terminal.`);
            }

            process.exit(1);
        }
    });
};