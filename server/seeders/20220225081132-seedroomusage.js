"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "RoomUsages",
      [
        {
          clientId: 1,
          roomId: 1,
          startTime: "10:00",
          endTime: "11:00",
          bookingDate: "2021-04-13",
          quotaUsed: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * INSERT INTO `roomUsage` (`id`, `clientId`, `roomId`, `startTime`, `endTime`, `bookingDate`, `quotaUsed`, `createdAt`) VALUES
(1, 2, 2, '10:00', '11:00', '2021-04-13', 5, '2021-04-15 05:25:52');

     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
