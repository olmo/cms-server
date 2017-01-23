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
        name: {type: DataTypes.STRING, allowNull: false},
        photo: {type: DataTypes.STRING, allowNull: true},
        grupo: {type: DataTypes.STRING, allowNull: false},
        address: {type: DataTypes.STRING, allowNull: true},
        phone: {type: DataTypes.STRING, allowNull: true},
        recibir_email: {type: DataTypes.STRING, allowNull: false, defaultValue: 1},
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