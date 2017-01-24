var db = require('../models/index');

async function main(){
    await db.sequelize.sync({force: true, logging: false}).catch(function(e) {
        console.log(e);
    });

    await db.User.create({username: 'admin', password: 'pass', email: 'admin@admin.com'});
    await db.Page.create({title: 'Inicio', content: '<blog-list></blog-list>', slug: 'inicio'});
    await db.Menu.create({title: 'Main', content: `[
        {"title": "inicio",  "link": "/pages", "param": "inicio"}, 
        {"title": "Presentación",  "link": "/pages", "param": "presentacion"}, 
        {"title": "Información",  "link": "", "param": "", "subitems": [
        {"title": "Historia",  "link": "/pages", "param": "historia"}, 
        {"title": "Preguntas frecuentes",  "link": "/pages", "param": "faq"}
        ]}, 
        {"title": "Enlaces",  "link": "/pages", "param": "enlaces"}
        ]}, 
        {"title": "Contacto",  "link": "/pages", "param": "contacto"}
        ]`
    });
}

main();