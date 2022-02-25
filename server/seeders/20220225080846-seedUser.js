"use strict";
const { encode } = require("../helper/bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "admin",
          email: "admin@email.com",
          password: encode("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "usertes1",
          email: "tes@email.com",
          password: encode("12345678"),
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
