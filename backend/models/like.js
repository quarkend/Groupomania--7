'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Post, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId',
      });

      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'postId',
        otherKey: 'userId',
      });

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'Post',
      });
    }
  };
  Like.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};