'use strict';
module.exports = function(sequelize, DataTypes) {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
  }
  );

  Ingredient.associate = (models) => {
    Ingredient.belongsToMany(models.Food, {
      through: "foodIngredient",
      foreignKey: 'ingredientId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Ingredient;
};
