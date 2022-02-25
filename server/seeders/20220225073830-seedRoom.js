"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Rooms",
      [
        {
          roomName: "Conference Room",
          costPerHour: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roomName: "Discussion Room",
          costPerHour: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roomName: "Event Space",
          costPerHour: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
