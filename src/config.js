/**
 * Created by pomy on 12/01/2017.
 * read user's github config
 */

'use strict';

let exec = require('child_process').execSync;

let log = require('./log');

module.exports = function () {
    let userName, userEmail;

    try {
        userName = exec('git config --get user.name');
        userEmail = exec('git config --get user.email');
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