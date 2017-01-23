'use strict';

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        title: {type: DataTypes.STRING, allowNull: false },
        cabecera: {type: DataTypes.STRING, allowNull: false },
        content: {type: DataTypes.STRING, allowNull: false },
        userId: {type: DataTypes.INTEGER, allowNull: false },
        estado: {type: DataTypes.INTEGER, allowNull: false },
        publico: {type: DataTypes.INTEGER, allowNull: false },
        categoryId: {type: DataTypes.INTEGER, allowNull: false }
    }, {
        timestamps: true,
        tableName: 'entradas',
        classMethods: {
            associate: function(models) {
                Post.belongsTo(models.Category, {foreignKey: 'categoryId', as: 'category'});
                Post.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
            }
        },
    });

    return Post;
};