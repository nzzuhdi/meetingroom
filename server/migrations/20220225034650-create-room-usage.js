"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("RoomUsages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Clients",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      roomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      startTime: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      endTime: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bookingDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      quotaUsed: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("RoomUsages");
  },
};
