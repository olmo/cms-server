var models  = require('../models');

var isAuthenticated = exports.isAuthenticated = function*(next, koa){
    if(koa.state.user){
        yield next;
    } else {
        return koa.throw(403, 'You are not authorized');
    }

};
