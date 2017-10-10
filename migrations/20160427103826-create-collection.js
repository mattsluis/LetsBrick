'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      set_id: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.INTEGER
      },
      imglink: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.INTEGER
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('collections');
  }
};
