var models  = require('../models'),
    authorization = require('./../utils/authorization.js');

var list = async function(ctx, next){
    var menus = await models.Menu.findAll();
    if(!menus){
        return ctx.throw(404, 'No hay menus');
    }

    ctx.body = menus;
};

var show = async function(ctx, next){
    let menu;
    if(isNaN(ctx.params.menuId))
        menu = await models.Menu.findOne({where: {slug: ctx.params.menuId}});
    else
        menu = await models.Menu.findById(ctx.params.menuId);
    
    if(!menu){
        return ctx.throw(404, 'No menu found');
    }

    ctx.body = menu;
};

var create = async function(ctx, next){
    var valores = await ctx.request.body;

    var menu = await models.Menu.create(valores);

    ctx.body = menu;
};

var borrar = async function(ctx, next){
    var borrado = await models.Menu.destroy({
        where: {
            id: ctx.params.menuId
        }
    });

    if(borrado){
        ctx.status = 200;
        ctx.body = "Menu borrada.";
    }

    else{
        ctx.status = 400;
        ctx.body = "ERROR al borrar menu.";
    }
};

var modify = async function(ctx, next){
    var valores = await ctx.request.body;

    var actualizado = await models.Menu.update(valores, {
        where: {
            id: ctx.params.menuId
        }
    });

    if(actualizado){
        var menu = await models.Menu.findById(ctx.params.menuId);
        ctx.body = menu;
    }

    else{
        ctx.status = 400;
        ctx.body = "Petición incorrecta.";
    }
};



exports.register = function(router){
    router.get('/menu/:menuId', show);
    router.get('/menu', list);
    router.post('/menu', create);
    router.delete('/menu/:menuId', borrar);
    router.put('/menu/:menuId', modify);
};