const foodController ={};
const { Food, Ingredient } = require('../models')
const { Sequelize } = require('sequelize');


function findOne(id) {
    return Food.findOne({
        where: {
            id
        },
        include: Ingredient
        
    });
}
function findOneing(id) {
    return Ingredient.findOne({
        where: {
            id
        }
    });
}


foodController.createFood = (req, res, next) => {
    Food.create(req.body).then( u =>res.json(u))
        .catch(next);
};

foodController.get = (req, res, next) => {
    Food.findAll({
        include: [{
            model: Ingredient,
            attributes: ['name'],
            through: {
                attributes: []
              }
          }],   
    }).then(foods => {
        res.json(foods)
    }).catch(next);
};

foodController.getFood = (req, res, next) => {
    const id = req.params.foodId;
    findOne(id).then(food => {
        if(food){
            res.json(food)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

foodController.editFood = (req, res, next) => {
    const newFood = req.body;
//   const id = newFood? newFood.id : undefined;
    const id = req.params.foodId;;
    findOne(id).then(food => {
        if (food) {
            Object.assign(food, newFood);
            food.save().then(food => res.json(food)).catch(next);
        }else {
            res.status(404).send();
        }
    }).catch(next);
};

foodController.deleteFood = (req, res, next) => {
    const id = req.params.foodId;
    findOne(id).then(food => {
        if (food) {
            food.destroy().then(res.status(200).send()).catch(next);
        }else {
            res.status(404).send();
        }
    }).catch(next);
};
foodController.addIngredienttoFood = async (req, res, next) => {
    const food_id = req.params.foodId;
    const ingredient_id = req.params.ingredientId;

    const ingredient = await findOneing(ingredient_id);

    findOne(food_id).then(food => {
        console.log(food);
        if(food){
             food.addIngredient(ingredient).then(food => res.json(food)).catch(next);
        } else {
            res.status(404).send();
        }
    }).catch(next);
}

foodController.findFoodsByIngredients = (req, res, next) => {
    const ingredientIds = req.body.ingredientIds;
    Food.findAll({
        include: [{
            model: Ingredient,
            attributes: [],
            through: {
                attributes: []
              },
            where: { id: ingredientIds }, // Filter ingredients by given ingredientIds
          }], 
        group: ['Food.id'], 
        having: Sequelize.literal(`COUNT(*) >= ${ingredientIds.length}`), // Filter foods with ingredient count <= ingredientIds.length

    }).then(foods => {
        res.json(foods)
    }).catch(next);
    //   const ingredientIds = req.body.ingredientIds;
    //   console.log(ingredientIds);
    //   Food.findAll({
    //     include: [
    //       {
    //         model: Ingredient,
    //         through: { attributes: ['name'] }, // Exclude junction table attributes
    //         //where: { id: ingredientIds }, // Filter ingredients by given ingredientIds
    //       },
    //     ],
    //     //group: ['Food.id'],
    //    // having: Sequelize.where(Sequelize.fn('COUNT', Sequelize.col('Ingredients.id')), '<=', ingredientIds.length),
    //    // having: Sequelize.literal(`COUNT(*) <= ${ingredientIds.length}`), // Filter foods with ingredient count <= ingredientIds.length
    //   }).then(foods => {
    //     res.json(foods)
    // }).catch(next);
 

};
   

module.exports = foodController;
