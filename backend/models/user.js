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
        username: DataTypes.STRING,
      image: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        profilePicture: DataTypes.STRING,
        coverPicture: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
        desc: DataTypes.STRING,
        city: DataTypes.STRING,
        from: DataTypes.STRING,
        relationship: DataTypes.STRING,
        userId: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};