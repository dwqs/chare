/**
 * Created by pomy on 10/01/2017.
 */

'use strict';

let Metalsmith = require('metalsmith');
let ora = require('ora');
let async = require('async');
let render = require('consolidate').handlebars.render;
let path = require('path');
let chalk = require('chalk');

let log = require('./log');
let getSetting  = require('./setting');
let ask = require('./ask');

/**
 * Generate a template given a `tmpDir` and `dest`.
 *
 * @param {String} projectName
 * @param {String} tmpDir
 * @param {String} dest
 * @param {Function} done
 */

module.exports = function (projectName, tmpDir, dest, done) {
    let setting = getSetting(projectName, tmpDir);

    let metalsmith = Metalsmith(path.join(tmpDir, 'template'));

    let data = Object.assign(metalsmith.metadata(), {
        destDirName: projectName,
        inPlace: dest === process.cwd(),
        noEscape: true
    });

    metalsmith
        .use(askQuestions(setting))
        //.use(filterFiles(opts.filters))
        .use(template)
        .clean(false)
        .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
        .destination(dest)
        .build(function (err) {
            if(err){
                return done(err);
            }

            //Generated success
            log.tips();
            ora({
                text: chalk.green(`${projectName} generated  success`)
            }).succeed();
            log.tips();

            done(null,setting.completeMessage);
        });

    return data;
};

function askQuestions (setting) {
    return function (files, metalsmith, done) {
        ask(setting.prompts, metalsmith.metadata(), done);
    }
}

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