"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "When I moved to Amsterdam",
          description: "My experience in another country",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Italian food",
          description: "Different italian food",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
