'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });
            Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                onDelete: 'CASCADE',
            })
        }
    };

    Comment.init({

        content: {
            type: DataTypes.TEXT,
            allowNull: false,

        },
        userId: {
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
