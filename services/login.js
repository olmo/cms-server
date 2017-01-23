var models  = require('../models'),
    jwt = require('jsonwebtoken');

var login = exports.login = async function login(ctx, next){
    var body = await ctx.request.body;

    var user = await models.User.findOne({where: {email: body.email}});
    if(!user){
        return ctx.throw(400, 'No user found');
    }
    else {
        var isEqual = user.comparePassword(body.password);
        if(isEqual){
            var token = jwt.sign({ userId: user.id, email: user.email, group: user.grupo }, 'shhhhh');
            ctx.body = {token: token};
        }
        else{
            return ctx.throw(400, 'Incorrect password');
        }
    }
};

exports.register = function(router){
    router.post('/login', login);
};