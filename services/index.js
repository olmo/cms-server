var router = require('koa-router')();
var fs = require("fs");
var path = require("path");

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        require('./'+file).register(router);
    });

module.exports = router;