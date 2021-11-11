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
        otherKey: 'PostId',
      });

      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'PostId',
        otherKey: 'userId',
      });

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      models.Like.belongsTo(models.Post, {
        foreignKey: 'PostId',
        as: 'Post',
      });
    }
  };
  Like.init({
    userId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};