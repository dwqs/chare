/**
 * Created by pomy on 10/01/2017.
 * 检验模板名是否存在，避免使用不存在的模板名时长时间的下载等待
 */

let request = require('request');
let ora = require('ora');
let chalk = require('chalk');

process.on('exit', function () {
    console.log()
});

module.exports = function (template,officialTemplate,done){
    console.log();
    let spinner = ora('checking template...');
    spinner.start();
    request({
        url: 'https://api.github.com/users/waka-templates/repos',
        headers: {
            'User-Agent': 'chare-cli'
        }
    }, (err, res, body) => {
        spinner.stop();
        if(err){
            console.error(chalk.red('chare cli:download template failed.'));
            process.exit(1);
        }
        let requestBody = JSON.parse(body);
        if (Array.isArray(requestBody)) {
            let reposName = [];
            requestBody.forEach(function (repo) {
                reposName.push(repo.name);
            });
            if(reposName.indexOf(template) > -1){
                done(officialTemplate);
            } else {
                console.error(chalk.red('Failed to download template ' + template + ': not exist'));
            }
        } else {
            console.error(chalk.red(requestBody.message));
        }
    });
};
