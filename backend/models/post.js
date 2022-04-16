'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                    foreignKey: 'userId',
                }
            });
            models.Post.hasMany(models.Comment,
                { onDelete: 'cascade' });

            models.Post.hasMany(models.Like,
                { onDelete: 'cascade' });


        }
    };
    Post.init({
        userId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        img: DataTypes.STRING,
        title: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};
