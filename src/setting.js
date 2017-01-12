/**
 * Created by pomy on 12/01/2017.
 * get user's setting
 */

'use strict';

let path = require('path');
let metadata = require('read-metadata');
let exists = require('fs').existsSync;
let getGitConfig = require('./config');
let validateName = require('validate-npm-package-name');

/**
 * Read prompts metadata from template.
 *
 * @param {String} projectName
 * @param {String} tmpDir
 * @return {Object}
 */

module.exports = function (projectName, tmpDir) {

};