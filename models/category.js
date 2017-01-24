'use strict';

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        name: {type: DataTypes.STRING, allowNull: false },
    }, {
        timestamps: false,
        tableName: 'blog_categories'
    });

    return Category;
};