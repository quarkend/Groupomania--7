'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            models.User.hasMany(models.Post,
                { onDelete: 'cascade' });

            models.User.hasMany(models.Comment,
                { onDelete: 'cascade' });

            models.User.hasMany(models.Like,
                { onDelete: 'cascade' });
        }
    };
    User.init({
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        image: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};