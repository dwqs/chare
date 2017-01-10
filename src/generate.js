/**
 * Created by pomy on 10/01/2017.
 */

let Metalsmith = require('metalsmith');
let ora = require('ora');
let async = require('async');
let render = require('consolidate').handlebars.render;
let path = require('path');
let chalk = require('chalk');

let log = require('../src/log');

module.exports = function (projectName, src, dest, done) {
    let spinner = ora({
        text: "generate project...",
        color:"blue"
    }).start();

    let metalsmith = Metalsmith(path.join(src, 'template'));
    metalsmith
        //.use(askQuestions(opts.prompts))
        //.use(filterFiles(opts.filters))
        .use(template)
        .clean(false)
        .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
        .destination(dest)
        .build(function (err) {
            if(err){
                return done(err);
            }
            spinner.text = chalk.green(`Generated ${projectName}`);
            spinner.succeed();
        });
};

function template (files,metalsmith,done) {
    let keys = Object.keys(files);
    let metadata = metalsmith.metadata();

    async.each(keys, (file, next) => {
        let str = files[file].contents.toString();

        // do not attempt to render files that do not have mustaches
        if (!/{{([^{}]+)}}/g.test(str)) {
            return next();
        }

        render(str, metadata, (err, res) => {
            if (err) {
                return next(err);
            }
            files[file].contents = new Buffer(res);
            next();
        });
    },done);
}