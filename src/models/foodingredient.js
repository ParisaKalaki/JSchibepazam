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
//     ingredientId: DataTypes.INTEGER,
//     foodId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'foodIngreadient',
//   });
//   return foodIngredient;
// }

'use strict';
module.exports = function(sequelize, DataTypes) {
  const foodIngredient = sequelize.define('foodIngredient', {
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }
  );

  return foodIngredient;
};
