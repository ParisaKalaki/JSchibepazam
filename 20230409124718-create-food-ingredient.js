// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('foodIngredients', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       foodId: {
//         type: Sequelize.INTEGER
//       },
//       ingredientId: {
//         type: Sequelize.INTEGER
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.fn('now')
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.fn('now')
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('foodIngredients');
//   }
// };
