"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {type: DataTypes.STRING, validate: {isEmail: true}, unique: true},
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            set: function (v) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(v, salt);

                this.setDataValue('password', hash);
            }
        },
        name: {type: DataTypes.STRING, allowNull: true},
        photo: {type: DataTypes.STRING, allowNull: true},
        group: {type: DataTypes.STRING, allowNull: true},
    }, {
        classMethods: {
            associate: function(models) {

            }
        },
        instanceMethods: {
            toJSON: function () {
                var values = this.get();

                delete values.password;
                return values;
            },
            comparePassword : function(candidatePassword) {
                return bcrypt.compareSync(candidatePassword, this.getDataValue('password'));
            }
        },
        tableName: 'usuarios',
        hooks: {

        }
    });

  return User;
};