var db = require('../models/index');

async function main(){
    await db.sequelize.sync({force: true, logging: false}).catch(function(e) {
        console.log(e);
    });

    await db.User.create({username: 'admin', password: 'pass'});
}

main();