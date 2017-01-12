/**
 * Created by pomy on 12/01/2017.
 * get user input
 */

'use strict';

let async = require('async');
let inquirer = require('inquirer');
let chalk = require('chalk');

// Support types from prompt-for which was used before
let promptMapping = {
    string: 'input',
    boolean: 'confirm'
};

/**
 * Ask questions, return results.
 *
 * @param {Object} prompts
 * @param {Object} data
 * @param {Function} done
 */

module.exports = function (prompts, data, done) {
    //https://github.com/metalsmith/metalsmith/blob/master/examples/project-scaffolder/build.js#L26
    async.eachSeries(Object.keys(prompts), function (key, done) {
        promptWraper(data, key, prompts[key], done);
    }, done);
};


/**
 * Inquirer prompt wrapper.
 *
 * @param {Object} data
 * @param {String} key
 * @param {Object} prompt
 * @param {Function} done
 */

function promptWraper (data, key, prompt, done) {

    let msg = prompt.message || prompt.label || key;

    inquirer.prompt([{
        type: promptMapping[prompt.type] || prompt.type,
        name: key,
        message: prompt.default ? `${msg} <${chalk.white(prompt.default)}>: ` : msg,
        choices: prompt.choices || [],
        validate: prompt.validate || function () {
            return true;
        }
    }]).then((anwsers) => {
        data[key] = anwsers[key];
        done();
    });
}

// let promptDefault = prompt.default;
// if (typeof prompt.default === 'function') {
//     promptDefault = function () {
//         return prompt.default.bind(this)(data);
//     }
// }
//
// inquirer.prompt([{
//     type: promptMapping[prompt.type] || prompt.type,
//     name: key,
//     message: prompt.message || prompt.label || key,
//     default: promptDefault,
//     choices: prompt.choices || [],
//     validate: prompt.validate || function () { return true }
// }]).then((answers) => {
//     if (Array.isArray(answers[key])) {
//         data[key] = {};
//         answers[key].forEach(function (multiChoiceAnswer) {
//             data[key][multiChoiceAnswer] = true;
//         });
//     } else {
//         data[key] = answers[key];
//     }
//     done();
// });