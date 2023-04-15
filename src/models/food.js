'use strict';
module.exports = function(sequelize, DataTypes) {
  const Food = sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
  }
  );

  Food.associate = (models) => {
    Food.belongsToMany(models.Ingredient, {
      through: "foodIngredient",
      foreignKey: 'foodId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Food;
};
