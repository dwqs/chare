/**
 * Created by pomy on 16/01/2017.
 * check the repos is exists on github.com.
 */

'use strict';

let request = require('request');
let ora = require('ora');
let chalk = require('chalk');

let log = require('../src/log');

module.exports = function (repo,done){
    let spinner = ora({
        text: 'checking template from github.com...',
        color:"blue"
    }).start();

    request({
        url: `https://github.com/${repo}`,
        headers: {
            'User-Agent': 'chare-cli'
        }
    }, (err, res) => {

        if(err){
            spinner.text = chalk.red(`chare cli:checking template ${repo} from github.com failed.`);
            spinner.fail();
            process.exit(1);
        }

        log.tips();

        if(res.statusCode === 200){
            spinner.text = chalk.green('Template checked success from github.com.');
            spinner.succeed();
            log.tips();
            done(repo);
        } else {
            spinner.stop();
            log.tips();
            log.tips(chalk.red(`Template checked fail: ${repo} not found on github.com`));
            log.tips();
            log.tips(`Please check all available official templates by ${chalk.blue('chare list')} in terminal.`);
            process.exit(1);
        }
    });
};
