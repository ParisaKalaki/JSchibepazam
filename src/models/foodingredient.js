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
    freezeTableName: true,
  },
  {
    freezeTableName: true,
  }
  );

  return foodIngredient;
};
