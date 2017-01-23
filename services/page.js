var models  = require('../models'),
    authorization = require('./../utils/authorization.js');

var list = async function(ctx, next){
    var pages = await models.Page.findAll();
    if(!pages){
        return ctx.throw(404, 'No hay pages');
    }

    ctx.body = pages;
};

var show = async function(ctx, next){
    let page;
    if(isNaN(ctx.params.pageId))
        page = await models.Page.findOne({where: {slug: ctx.params.pageId}});
    else
        page = await models.Page.findById(ctx.params.pageId);
    
    if(!page){
        return ctx.throw(404, 'No page found');
    }

    ctx.body = page;
};

var create = async function(ctx, next){
    var valores = await ctx.request.body;

    var page = await models.Page.create(valores);

    ctx.body = page;
};

var borrar = async function(ctx, next){
    var borrado = await models.Page.destroy({
        where: {
            id: ctx.params.pageId
        }
    });

    if(borrado){
        ctx.status = 200;
        ctx.body = "Page borrada.";
    }

    else{
        ctx.status = 400;
        ctx.body = "ERROR al borrar page.";
    }
};

var modify = async function(ctx, next){
    var valores = await ctx.request.body;

    var actualizado = await models.Page.update(valores, {
        where: {
            id: ctx.params.pageId
        }
    });

    if(actualizado){
        var page = await models.Page.findById(ctx.params.pageId);
        ctx.body = page;
    }

    else{
        ctx.status = 400;
        ctx.body = "Petición incorrecta.";
    }
};



exports.register = function(router){
    router.get('/page/:pageId', show);
    router.get('/page', list);
    router.post('/page', create);
    router.delete('/page/:pageId', borrar);
    router.put('/page/:pageId', modify);
};