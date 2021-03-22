"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "My first job",
          content:
            "When I first moved to Amsterdam I found a job in a nice restaurant",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "My second job",
          content: "After working in a restaurant I decided to work in a cafe",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Pizza Margherita",
          content:
            "One of the most common italian pizza, originated from Queen Margherita...",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2,
        },
        {
          name: "Pasta alla bolognese",
          content: "A kind of pasta wit tomato sauce and meat",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
