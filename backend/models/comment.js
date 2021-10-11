'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: 'ownerId',
                onDelete: 'CASCADE',
            });
            Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                onDelete: 'CASCADE',
            })
        }
    };

    Comment.init({
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,

        },
        ownerId: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,

        }
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};
