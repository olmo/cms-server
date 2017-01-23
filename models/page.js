'use strict';

module.exports = function(sequelize, DataTypes) {
    var Page = sequelize.define('Page', {
        title: {type: DataTypes.STRING, allowNull: false },
        content: {type: DataTypes.STRING, allowNull: false },
        slug: {type: DataTypes.STRING, allowNull: false }
    }, {
        timestamps: true,
        tableName: 'secciones',
        classMethods: {
            associate: function(models) {
                
            }
        },
    });

    return Page;
};