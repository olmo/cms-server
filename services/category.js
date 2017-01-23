var models  = require('../models'),
    authorization = require('./../utils/authorization.js');

var list = async function(ctx, next){
    var categories = await models.Category.findAll();
    if(!categories){
        return ctx.throw(404, 'No hay categories');
    }

    ctx.body = categories;
};

var show = async function(ctx, next){
    var category = await models.Category.findById(ctx.params.categoryId);
    if(!category){
        return ctx.throw(404, 'No category found');
    }

    ctx.body = category;
};

var create = async function(ctx, next){
    var valores = await ctx.request.body;

    var category = await models.Category.create(valores);

    ctx.body = category;
};

var borrar = async function(ctx, next){
    
    var borrado = await models.Category.destroy({
        where: {
            id: ctx.params.categoryId
        }
    });

    if(borrado){
        ctx.status = 200;
        ctx.body = "Category borrada.";
    }

    else{
        ctx.status = 400;
        ctx.body = "ERROR al borrar category.";
    }
};

var modify = async function(ctx, next){
    var valores = await ctx.request.body;

    var actualizado = await models.Category.update(valores, {
        where: {
            id: ctx.params.categoryId
        }
    });

    if(actualizado){
        var category = await models.Category.findById(ctx.params.categoryId);
        ctx.body = category;
    }

    else{
        ctx.status = 400;
        ctx.body = "Petición incorrecta.";
    }
};



exports.register = function(router){
    router.get('/category/:categoryId', show);
    router.get('/category', list);
    router.post('/category', create);
    router.delete('/category/:categoryId', borrar);
    router.put('/category/:categoryId', modify);
};