// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Food extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Food.associate = function(models) {
//         // associations can be defined here
//         Food.belongsToMany(models.Ingredient, {
//           as: 'Ingredient',
//           foreignKey: 'ingredientId',
//           through: 'foodIngredient',
//         })
//       };
//     }
//   }
//   Food.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Food',
//   });
//   return Food;
// };

'use strict';
module.exports = function(sequelize, DataTypes) {
  const Food = sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }
  );

  Food.associate = (models) => {
    Food.belongsToMany(models.Ingredient, {
      through: "foodIngredient",
      foreignKey: 'ingredientId',
    });
  };

  return Food;
};
