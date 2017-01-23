var models  = require('../models'),
    authorization = require('./../utils/authorization.js'),
    jwt = require('koa-jwt');

var list = async function(ctx, next){
    var users = await models.User.findAll();
    if(!users){
        return ctx.throw(404, 'No hay users');
    }

    ctx.body = users;
};

var show = async function(ctx, next){
    var user = await models.User.findById(ctx.params.userId);
    if(!user){
        return ctx.throw(404, 'No user found');
    }

    ctx.body = user;
};

var create = async function(ctx, next){
    var valores = await ctx.request.body;

    var user = await models.User.findOne({where: {email: valores.email}});

    if(user){

    }
    else{
        user = await models.User.create(valores);
    }

    ctx.body = jwt.sign({ id: user.id, email: user.email }, 'shhhhh');
};

var remove = async function(ctx, next){
    var borrado = await models.User.destroy({
        where: {
            id: ctx.params.userId
        }
    });

    if(borrado){
        ctx.status = 200;
        ctx.body = "User borrado.";
    }

    else{
        ctx.status = 400;
        ctx.body = "ERROR al borrar user.";
    }
};

var update = async function(ctx, next){
    var valores = await ctx.request.body;

    var actualizado = await models.User.update(valores, {
        where: {
            id: ctx.params.userId
        }
    });

    if(actualizado){
        var user = await models.User.findById(ctx.params.userId);
        ctx.body = user;
    }

    else{
        ctx.status = 400;
        ctx.body = "Petición incorrecta.";
    }
};



exports.register = function(router){
    router.get('/user/:userId', show);
    router.get('/user', list);
    router.post('/user', create);
    router.delete('/user/:userId', remove);
    router.put('/user/:userId', update);
};

/*

 SELECT "Oferta"."id", "Oferta"."almacenId", "Oferta"."partidaId", "Oferta"."general", "Oferta"."precio", "Oferta"."descuento", "almacen"."id" AS "almacen.id", "almacen"."tiendaId" AS "almacen.tiendaId", "almacen"."articuloId" AS "almacen.articuloId", "almacen"."stock" AS "almacen.stock", "almacen"."stock1" AS "almacen.stock1", "almacen"."stock2" AS "almacen.stock2", "almacen"."maximo" AS "almacen.maximo", "almacen"."minimo" AS "almacen.minimo", "almacen"."entradas" AS "almacen.entradas", "almacen"."entradas2" AS "almacen.entradas2", "almacen"."salidas" AS "almacen.salidas", "almacen"."salidas2" AS "almacen.salidas2", "almacen"."recibir" AS "almacen.recibir", "almacen"."servir" AS "almacen.servir", "almacen"."correccion" AS "almacen.correccion", "almacen"."compras" AS "almacen.compras", "almacen"."compras2" AS "almacen.compras2", "almacen"."ventas" AS "almacen.ventas", "almacen"."ventas2" AS "almacen.ventas2", "almacen"."facturar" AS "almacen.facturar", "almacen"."fechacompra" AS "almacen.fechacompra", "almacen"."fechaventa" AS "almacen.fechaventa", "almacen"."fechacorreccion" AS "almacen.fechacorreccion", "almacen"."enCatalogo" AS "almacen.enCatalogo", "partida"."id" AS "partida.id", "partida"."almacenId" AS "partida.almacenId", "partida"."partida" AS "partida.partida", "partida"."nombre" AS "partida.nombre", "partida"."cajas" AS "partida.cajas", "partida"."kilos" AS "partida.kilos", "partida"."stock_cajas" AS "partida.stock_cajas", "partida"."stock_kilos" AS "partida.stock_kilos", "partida"."precio" AS "partida.precio", "partida"."fechaCompra" AS "partida.fechaCompra", "partida"."fechaCaptura" AS "partida.fechaCaptura", "partida"."fechaCaducidad" AS "partida.fechaCaducidad", "partida"."zonaId" AS "partida.zonaId", "partida"."zonaDescripcion" AS "partida.zonaDescripcion", "partida"."lonjaId" AS "partida.lonjaId", "partida"."lonjaDescripcion" AS "partida.lonjaDescripcion", "partida"."presentacionId" AS "partida.presentacionId", "partida"."metodoId" AS "partida.metodoId", "partida"."observaciones" AS "partida.observaciones", "partida"."foto" AS "partida.foto", "partida"."abierta" AS "partida.abierta", "partida"."calibre" AS "partida.calibre", "partida"."categoria" AS "partida.categoria", "clientes"."id" AS "clientes.id", "clientes"."userId" AS "clientes.userId", "clientes"."tiendaId" AS "clientes.tiendaId", "clientes"."estado" AS "clientes.estado", "clientes"."codigo" AS "clientes.codigo", "clientes"."datosComercialesId" AS "clientes.datosComercialesId", "clientes"."contable" AS "clientes.contable", "clientes"."agenteId" AS "clientes.agenteId", "clientes"."vendedorId" AS "clientes.vendedorId", "clientes"."rutaId" AS "clientes.rutaId", "clientes"."tarifa" AS "clientes.tarifa", "clientes"."recargo" AS "clientes.recargo", "clientes"."tipoFacturacion" AS "clientes.tipoFacturacion", "clientes"."tipoVenta" AS "clientes.tipoVenta", "clientes"."modelo" AS "clientes.modelo", "clientes"."tantoretencion" AS "clientes.tantoretencion", "clientes"."tantoincremento" AS "clientes.tantoincremento", "clientes"."tantogastos" AS "clientes.tantogastos", "clientes"."copias" AS "clientes.copias", "clientes"."riesgo1" AS "clientes.riesgo1", "clientes"."pendiente1" AS "clientes.pendiente1", "clientes"."riesgo2" AS "clientes.riesgo2", "clientes"."pendiente2" AS "clientes.pendiente2", "clientes"."fechaventa" AS "clientes.fechaventa", "clientes.oferta_cliente"."ofertaId" AS "clientes.oferta_cliente.ofertaId", "clientes.oferta_cliente"."clienteId" AS "clientes.oferta_cliente.clienteId", "grupos"."id" AS "grupos.id", "grupos"."tiendaId" AS "grupos.tiendaId", "grupos"."codigo" AS "grupos.codigo", "grupos"."nombre" AS "grupos.nombre", "grupos.oferta_grupo"."ofertaId" AS "grupos.oferta_grupo.ofertaId", "grupos.oferta_grupo"."GrupoId" AS "grupos.oferta_grupo.GrupoId", "grupos.clientes"."id" AS "grupos.clientes.id", "grupos.clientes"."userId" AS "grupos.clientes.userId", "grupos.clientes"."tiendaId" AS "grupos.clientes.tiendaId", "grupos.clientes"."estado" AS "grupos.clientes.estado", "grupos.clientes"."codigo" AS "grupos.clientes.codigo", "grupos.clientes"."datosComercialesId" AS "grupos.clientes.datosComercialesId", "grupos.clientes"."contable" AS "grupos.clientes.contable", "grupos.clientes"."agenteId" AS "grupos.clientes.agenteId", "grupos.clientes"."vendedorId" AS "grupos.clientes.vendedorId", "grupos.clientes"."rutaId" AS "grupos.clientes.rutaId", "grupos.clientes"."tarifa" AS "grupos.clientes.tarifa", "grupos.clientes"."recargo" AS "grupos.clientes.recargo", "grupos.clientes"."tipoFacturacion" AS "grupos.clientes.tipoFacturacion", "grupos.clientes"."tipoVenta" AS "grupos.clientes.tipoVenta", "grupos.clientes"."modelo" AS "grupos.clientes.modelo", "grupos.clientes"."tantoretencion" AS "grupos.clientes.tantoretencion", "grupos.clientes"."tantoincremento" AS "grupos.clientes.tantoincremento", "grupos.clientes"."tantogastos" AS "grupos.clientes.tantogastos", "grupos.clientes"."copias" AS "grupos.clientes.copias", "grupos.clientes"."riesgo1" AS "grupos.clientes.riesgo1", "grupos.clientes"."pendiente1" AS "grupos.clientes.pendiente1", "grupos.clientes"."riesgo2" AS "grupos.clientes.riesgo2", "grupos.clientes"."pendiente2" AS "grupos.clientes.pendiente2", "grupos.clientes"."fechaventa" AS "grupos.clientes.fechaventa", "grupos.clientes.cliente_grupo"."grupoId" AS "grupos.clientes.cliente_grupo.grupoId", "grupos.clientes.cliente_grupo"."clienteId" AS "grupos.clientes.cliente_grupo.clienteId" FROM "ofertas" AS "Oferta" LEFT OUTER JOIN "almacenes" AS "almacen" ON "Oferta"."almacenId" = "almacen"."id" LEFT OUTER JOIN "partidas" AS "partida" ON "Oferta"."partidaId" = "partida"."id" LEFT OUTER JOIN ("oferta_cliente" AS "clientes.oferta_cliente" INNER JOIN "clientes" AS "clientes" ON "clientes"."id" = "clientes.oferta_cliente"."clienteId") ON "Oferta"."id" = "clientes.oferta_cliente"."ofertaId" LEFT OUTER JOIN ("oferta_grupo" AS "grupos.oferta_grupo" INNER JOIN "grupos" AS "grupos" ON "grupos"."id" = "grupos.oferta_grupo"."GrupoId") ON "Oferta"."id" = "grupos.oferta_grupo"."ofertaId" LEFT OUTER JOIN ("cliente_grupo" AS "grupos.clientes.cliente_grupo" INNER JOIN "clientes" AS "grupos.clientes" ON "grupos.clientes"."id" = "grupos.clientes.cliente_grupo"."clienteId") ON "grupos"."id" = "grupos.clientes.cliente_grupo"."grupoId" WHERE ("Oferta"."clientes.userId" = '4');

 */