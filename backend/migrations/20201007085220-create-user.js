'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },

      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },

      profilePicture: {
        allowNull: true,
        type: Sequelize.STRING
      },
      coverPicture: {
        allowNull: true,
        type: Sequelize.STRING
      }, isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      desc: {
        allowNull: true,
        type: Sequelize.STRING
      },
      image: {
        relationship: true,
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};