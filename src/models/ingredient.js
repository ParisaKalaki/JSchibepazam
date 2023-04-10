'use strict';
module.exports = function(sequelize, DataTypes) {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }
  );

  Ingredient.associate = (models) => {
    Ingredient.belongsToMany(models.Food, {
      through: "foodIngredient",
      foreignKey: 'foodId',
    });
  };

  return Ingredient;
};
