'use strict';

module.exports = function(sequelize, DataTypes) {
    var LibraryItem = sequelize.define('LibraryItem', {
        title: {type: DataTypes.STRING, allowNull: false },
        description: {type: DataTypes.TEXT, allowNull: false },
        type: {type: DataTypes.INTEGER, allowNull: false},
        userId: {type: DataTypes.INTEGER, allowNull: false },
        categoryId: {type: DataTypes.INTEGER, allowNull: false }
    }, {
        timestamps: true,
        tableName: 'library_items',
        classMethods: {
            associate: function(models) {
                LibraryItem.belongsTo(models.LibraryCategory, {foreignKey: 'categoryId', as: 'category'});
                LibraryItem.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
            }
        },
    });

    return LibraryItem;
};