'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'ownerId',
                onDelete: 'CASCADE',
            });
        }
    };
    Post.init({
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: ' titre',
                },


            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {



            }
        },
        image: {
            type: DataTypes.STRING,
        },
        ownerId: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};
