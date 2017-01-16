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
        text: `checking repo ${repo} from github.com...`,
        color:"blue"
    }).start();

    request({
        url: `https://github.com/${repo}`,
        headers: {
            'User-Agent': 'chare-cli'
        }
    }, (err, res) => {
        console.log('code111',res.statusCode)
        if(err){
            spinner.text = chalk.red('chare cli:checking repos failed.');
            spinner.fail();
            process.exit(1);
        }

        log.tips();

        if(res.statusCode === 200){
            spinner.text = chalk.green('Repos checked success.');
            spinner.succeed();
            log.tips();
            done(repo);
            return true;
        } else {
            spinner.stop();
            log.error(`Repos ${template} not found on github.com`);
            return false;
        }
    });
};
