/**
 * Created by pomy on 12/01/2017.
 * read user's github config
 */

'use strict';

let shell = require('shelljs');

let log = require('./log');

module.exports = function () {
    let userName, userEmail;

    try {
        userName = shell.exec('git config --get user.name', {async: false});
        userEmail = shell.exec('git config --get user.email', {async: false});
    } catch (e) {
        log.error(`got github config error: ${e.message}`);
    }

    userName = userName && JSON.stringify(userName.toString().trim()).slice(1, -1);
    userEmail = userEmail && (' <' + userEmail.toString().trim() + '>');

    if(userName){
        return userName;
    } else if(userEmail){
        return userEmail
    } else {
        return '';
    }
};