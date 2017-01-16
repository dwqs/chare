/**
 * Created by pomy on 16/01/2017.
 * some utils function
 */

'use strict';

let fs = require('fs');
let path = require('path');

let log = require('./log');

module.exports = {
    isExist(tplPath){
        let p = path.normalize(tplPath);
        try {
            fs.accessSync(p, fs.R_OK & fs.W_OK, (err) => {
                if(err){
                    log.tips();
                    log.error(`Permission Denied to access ${p}`);
                }
            });
            return true;
        } catch (e){
            return false;
        }
    },

    isLocalTemplate(tpl){
        let tmp = path.join('.',tpl) === tpl; //for check path: test/sdas
        return tpl.startsWith('.') || tpl.startsWith('/') || /^\w:/.test(tpl) || tmp;
    }
};
