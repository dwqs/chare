/**
 * Created by pomy on 12/01/2017.
 * get user's setting
 */

'use strict';

let path = require('path');
let metadata = require('read-metadata');
let exists = require('fs').existsSync;
let getGithubConfig = require('./config');
let validateName = require('validate-npm-package-name');

/**
 * Read metadata of template
 *
 * @param {String} dir
 * @return {Object}
 */

function getMetadata (dir) {
    let json = path.join(dir, 'meta.json');
    let js = path.join(dir, 'meta.js');
    let setting = {};

    if (exists(json)) {
        setting = metadata.sync(json);
    } else if (exists(js)) {
        let req = require(path.resolve(js));
        if (req !== Object(req)) {
            throw new Error('meta.js needs to expose an object');
        }
        setting = req;
    }

    return setting
}

/**
 * Set the default value for a prompt question
 *
 * @param {Object} setting
 * @param {String} key
 * @param {String} val
 */

function setDefault (setting, key, val) {

    let prompts = setting.prompts || (setting.prompts = {});
    if (!prompts[key] || typeof prompts[key] !== 'object') {
        prompts[key] = {
            'type': 'string',
            'default': val
        }
    } else {
        prompts[key]['default'] = val;
    }
}

/**
 * check the projectName is valid for npm publish
 *
 * @param setting
 */

function setValidateName (setting) {
    let name = setting.prompts.name;
    let customValidate = name.validate;

    name.validate = function (name) {
        let res = validateName(name);
        if (!res.validForNewPackages) {
            let errors = (res.errors || []).concat(res.warnings || []);
            return 'Sorry, ' + errors.join(' and ') + '.';
        }
        if (typeof customValidate === 'function') {
            return customValidate(name);
        }

        return true
    }
}

/**
 * Read prompts metadata from template.
 *
 * @param {String} projectName
 * @param {String} tmpDir
 * @return {Object}
 */

module.exports = function (projectName, tmpDir) {
    let setting = getMetadata(tmpDir);

    setDefault(setting, 'name', projectName);
    setValidateName(setting);

    let authorInfo = getGithubConfig();
    if (authorInfo) {
        setDefault(setting, 'author', authorInfo);
    }

    return setting;
};