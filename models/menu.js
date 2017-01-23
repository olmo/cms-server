'use strict';

module.exports = function(sequelize, DataTypes) {
    var Menu = sequelize.define('Menu', {
        title: {type: DataTypes.STRING, allowNull: false },
        content: {type: DataTypes.TEXT, allowNull: false },
    }, {
        tableName: 'menus',
        classMethods: {
            associate: function(models) {
                
            }
        },
    });

    return Menu;
};