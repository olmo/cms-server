var models  = require('../models'),
    authorization = require('./../utils/authorization.js');

var list = async function(ctx, next){
    var posts = await models.Post.findAll({include: [
        {model: models.User, as: 'user'},
        {model: models.Category, as: 'category'}
    ], order: [['id', 'DESC']]});
    if(!posts){
        return ctx.throw(404, 'No hay posts');
    }

    ctx.body = posts;
};

var show = async function(ctx, next){
    var post = await models.Post.findById(ctx.params.postId, {include: [
        {model: models.User, as: 'user'},
        {model: models.Category, as: 'category'}
    ]});
    if(!post){
        return ctx.throw(404, 'No post found');
    }

    ctx.body = post;
};

var create = async function(ctx, next){
    var valores = await ctx.request.body;
    valores.userId = ctx.state.user.userId;

    var post = await models.Post.create(valores);

    ctx.body = post;
};

var borrar = async function(ctx, next){
    
    var borrado = await models.Post.destroy({
        where: {
            id: ctx.params.postId
        }
    });

    if(borrado){
        ctx.status = 200;
        ctx.body = "Post borrada.";
    }

    else{
        ctx.status = 400;
        ctx.body = "ERROR al borrar post.";
    }
};

var modify = async function(ctx, next){
    var valores = await ctx.request.body;

    var actualizado = await models.Post.update(valores, {
        where: {
            id: ctx.params.postId
        }
    });

    if(actualizado){
        var post = await models.Post.findById(ctx.params.postId);
        ctx.body = post;
    }

    else{
        ctx.status = 400;
        ctx.body = "Petición incorrecta.";
    }
};



exports.register = function(router){
    router.get('/post/:postId', show);
    router.get('/post', list);
    router.post('/post', create);
    router.delete('/post/:postId', borrar);
    router.put('/post/:postId', modify);
};