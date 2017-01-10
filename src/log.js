/**
 * Created by pomy on 10/01/2017.
 * 控制台输出
 */

let chalk = require('chalk');

module.exports = {
    error(msg){
        console.log(chalk.red(msg));
    },
    success(msg){
        console.log(chalk.green(msg));
    },
    tips(msg=''){
        console.log(msg);
    }
};