/**
 * Created by pomy on 16/01/2017.
 * check the repos is exists on github.com.
 */

'use strict';

let axios = require('axios');
let ora = require('ora');
let chalk = require('chalk');

let log = require('./log');

module.exports = function (repo,done){
    let oraer = ora({
        text: 'checking template from github.com...',
        color:"blue"
    }).start();

    axios({
        url: `https://github.com/${repo}`,
        method: 'get',
        headers: {
            'User-Agent': 'chare-cli'
        }
    }).then((res) => {
        log.tips();

        if(res.status === 200){
            oraer.text = chalk.green('Template checked success from github.com.');
            oraer.succeed();

            log.tips();
            done(repo);
        } else {
            oraer.stop();

            log.tips();
            log.tips(chalk.red(`Template checked fail: ${repo} not found on github.com`));
            log.tips();
            log.tips(`Please check all available official templates by ${chalk.blue('chare list')} in terminal.`);
            process.exit(1);
        }
    }).catch((err) => {
        let res = err.response;
        if(err){
            spinner.text = chalk.white(`chare cli:checking template ${repo} failed from github.com, error message as follows:`);
            spinner.fail();

            log.tips();
            log.tips(chalk.red(`     ${res.statusText}: ${res.headers.status}`));
            log.tips();
            log.tips(`Please check all available official templates by ${chalk.blue('chare list')} in terminal.`);
            process.exit(1);
        }
    });
};