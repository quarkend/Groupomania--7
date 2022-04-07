'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emoji extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Post, {
        through: models.Emoji,
        foreignKey: 'userId',
        otherKey: 'postId',
      });

      models.Post.belongsToMany(models.User, {
        through: models.Emoji,
        foreignKey: 'postId',
        otherKey: 'userId',
      });

      models.Emoji.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      models.Emoji.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'Post',
      });
    }
  };
  Emoji.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    emoji: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Emoji',
  });
  return Emoji;
};