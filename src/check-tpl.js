/**
 * Created by pomy on 10/01/2017.
 * check the template is exists on https://github.com/waka-templates.
 */

'use strict';

let axios = require('axios');
let ora = require('ora');
let chalk = require('chalk');

let utils = require('../src/utils');
let log = require('./log');

const REQUEST_URL = 'https://api.github.com/orgs/waka-templates/repos';

module.exports = function (template,officialTemplate,done){
    log.tips();

    template = template.indexOf('/') === -1 ? template : template.split('/')[0];

    let spinner = ora({
        text: "checking official template...",
        color:"blue"
    }).start();

    axios(utils.getAuthInfo(REQUEST_URL)).then((res) => {
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
                process.exit(1);
            }
        } else {
            spinner.text = chalk.white('chare cli:checking template failed, error message as follows:');
            spinner.fail();

            log.tips();
            log.error(`     ${res.statusText}: ${res.data.message}`);
        }
    }).catch((err) => {
        if(err){
            let res = err.response;

            spinner.text = chalk.white('chare cli:checking official template failed, error message as follows:');
            spinner.fail();
            log.tips();

            if(res && res.status === 403){
                //api rate limit:https://developer.github.com/v3/#rate-limiting
                log.tips(chalk.red(`     ${res.statusText}: ${res.data.message}\n\ndocumentation: ${res.data.documentation_url}`));
                log.tips();
                log.tips(`     Please set auth token to get a higher rate limit by ${chalk.blue('chare token')}. Check out the documentation for more details.`);
                log.tips();
                log.tips('     documentation: https://developer.github.com/v3/auth/#basic-authentication');
                process.exit(1);
            } else {
                if(res){
                    log.error(`     ${res.statusText}: ${res.data.message}`);
                }
                log.error(`     ${err.message}`);
            }
        }
    });
};
