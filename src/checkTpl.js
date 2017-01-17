/**
 * Created by pomy on 10/01/2017.
 * check the template is exists on https://github.com/waka-templates.
 */

'use strict';

let axios = require('axios');
let ora = require('ora');
let chalk = require('chalk');

let log = require('./log');

module.exports = function (template,officialTemplate,done){
    log.tips();

    template = template.indexOf('/') === -1 ? template : template.split('/')[0];

    let spinner = ora({
        text: "checking official template...",
        color:"blue"
    }).start();

    axios({
        url: 'https://api.github.com/users/waka-templates/repos',
        headers: {
            'User-Agent': 'chare-cli'
        },
        auth:{
            "username":'dwqs',
            "password":"3b89a5a4337405a5bfe8d3512c9c30ea9ca1c210"
        }
    }).then((res) => {
        if (Array.isArray(res.data)) {
            let reposName = [];

            res.data.forEach(function (repo) {
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
            log.error(`     ${res.statusText}: ${res.data.message}`);
        }
    }).catch((err) => {
        let res = err.response;
        if(err){
            spinner.text = chalk.white('chare cli:checking official template failed, error message as follows:');
            spinner.fail();

            log.tips();
            log.error(`     ${res.statusText}: ${res.data.message}`);
        }
    });
};
