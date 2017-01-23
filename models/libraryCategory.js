'use strict';

module.exports = function(sequelize, DataTypes) {
    var LibraryCategory = sequelize.define('LibraryCategory', {
        name: {type: DataTypes.STRING, allowNull: false },
        parentId: {type: DataTypes.INTEGER, allowNull: true },
    }, {
        timestamps: false,
        tableName: 'library_categories',
        classMethods: {
            associate: function(models) {
                LibraryCategory.belongsTo(models.LibraryCategory, {foreignKey: 'parentId', as: 'category'});
            }
        },
    });

    return LibraryCategory;
};