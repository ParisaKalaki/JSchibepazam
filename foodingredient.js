// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class foodIngredient extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   foodIngredient.init({
//     foodId: DataTypes.INTEGER,
//     ingredientId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'foodIngredient',
//   });
//   return foodIngredient;
// };

const foodIngredient = sequelize.define('foodIngredient', {}, { timestamps: false });
Food.belongsToMany(Ingredient, { through: foodIngredient });
Ingredient.belongsToMany(Food, { through: foodIngredient });
