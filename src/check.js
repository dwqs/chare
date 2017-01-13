/**
 * Created by pomy on 10/01/2017.
 * check the template is exists.
 */

'use strict';

let request = require('request');
let ora = require('ora');
let chalk = require('chalk');

let log = require('../src/log');

module.exports = function (template,officialTemplate,done){
    log.tips();

    let spinner = ora({
        text: "checking template...",
        color:"blue"
    }).start();

    request({
        url: 'https://api.github.com/users/waka-templates/repos',
        headers: {
            'User-Agent': 'chare-cli'
        },
        auth:{
            "user":'dwqs',
            "pass":"9d8267d93214144f7f2602faa643c62708031641"
        }
    }, (err, res, body) => {
        if(err){
            spinner.text = chalk.red('chare cli:checking template failed.');
            spinner.fail();
            process.exit(1);
        }

        let requestBody = JSON.parse(body);
        if (Array.isArray(requestBody)) {
            let reposName = [];

            requestBody.forEach(function (repo) {
                reposName.push(repo.name);
            });

            if(reposName.indexOf(template) > -1){
                spinner.text = chalk.green('Template checked success.');
                spinner.succeed();
                log.tips();
                done(officialTemplate);
            } else {
                spinner.stop();
                log.tips(`Failed to download template ${chalk.red(template)}: ${chalk.red(template)} doesn\'t exist.`);
                log.tips();
                log.tips(`Please check all available official templates by ${chalk.blue('chare list')} in terminal.`);
            }
        } else {
            spinner.text = chalk.white('chare cli:checking template failed, error message as follows:');
            spinner.fail();

            log.tips();
            log.error(requestBody.message);
        }
    });
};
