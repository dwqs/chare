/**
 * Created by pomy on 10/01/2017.
 * 检验模板名是否存在，避免使用不存在的模板名时长时间的下载等待
 */

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
            'user': 'dwqs',
            'pass': '3385ea6539aaf3f4c5bb429e55640e1b75a12f99'
        }
    }, (err, res, body) => {
        if(err){
            spinner.text = chalk.red('chare cli:checking template failed.');
            spinner.fail();
            process.exit(1);
        }

        let requestBody = JSON.parse(body);
        if (Array.isArray(requestBody)) {
            spinner.text = chalk.green('Template checked success.');
            spinner.succeed();
            log.tips();

            let reposName = [];
            requestBody.forEach(function (repo) {
                reposName.push(repo.name);
            });
            if(reposName.indexOf(template) > -1){
                log.tips();
                done(officialTemplate);
            } else {
                log.error(`Failed to download template ${chalk.blue(template)}: ${chalk.blue(template)} doesn\'t exist`);
                log.tips();
                log.tips('Please visit https://github.com/waka-templates to find the template you want.');
            }
        } else {
            spinner.text = chalk.white('chare cli:checking template failed, error message as follows:');
            spinner.fail();

            log.tips();
            log.error(requestBody.message);
        }
    });
};
