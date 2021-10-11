'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(180),
            allowNull: false,
            unique: true,

        },
        username: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Vous devez saisir un nom d\'utilisateur',
                },


            }
        },
        roles: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: ['USER'],
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
