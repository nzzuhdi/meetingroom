"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Clients",
      [
        {
          name: "James Bond",
          email: "james.bond@email.com",
          phone: "+112345678",
          credit: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Wonder Woman",
          email: "wonder.woman@email.com",
          phone: "+1123456789",
          credit: 10,
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
