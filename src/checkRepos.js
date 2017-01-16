/**
 * Created by pomy on 16/01/2017.
 * check the repos is exists on github.com.
 */

'use strict';

let request = require('request');
let ora = require('ora');
let chalk = require('chalk');

let log = require('../src/log');

module.exports = function (repo){
    let spinner = ora({
        text: "checking from github...",
        color:"blue"
    }).start();

    request({
        url: `https://github.com/${repo}`,
        headers: {
            'User-Agent': 'chare-cli'
        }
    }, (err, res) => {
        if(err){
            spinner.text = chalk.red('chare cli:checking repos failed.');
            spinner.fail();
            process.exit(1);
        }

        spinner.stop();
        log.tips();

        if(res.statusCode === 200){
            return true;
        } else {
            return false;
        }
    });
};
