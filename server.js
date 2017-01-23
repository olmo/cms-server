require('babel-register')({
    plugins: ['transform-async-to-generator']
});

var Koa = require('koa');
var mount = require('koa-mount');
var serve = require('koa-static');
var services = require('./services');
var jwt = require('koa-jwt');
var cors = require('kcors');
var logger = require('koa-logger');
var koaBody   = require('koa-body');

var app = new Koa();
app.use(logger());
app.use(cors());
app.use(jwt({ secret: 'shhhhh', passthrough: true }));
app.use(koaBody({strict: false, multipart:true, formidable:{uploadDir: __dirname+'/tmp'}}));
app.use(mount('/media/', serve('media')));
//app.use(mount('/', services));
app.use(services.routes());
app.use(services.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');

