const router = require('express').Router();
const FoodController = require('../controllers/food-controller');

router.route('/foods')
    .post(FoodController.createFood) // to create new subordinate resources
    .get(FoodController.get); // to retrieve resource representation/information only

router.route('/foods/:foodId')
    .get(FoodController.getFood) // to retrieve resource representation/information only
    .put(FoodController.editFood) // to update existing resource
    .delete(FoodController.deleteFood)  // to delete resources
    .patch(()=>{}); // to make partial update on a resource

router.route('/foods/:foodId/ingredients/:ingredientId')
    .post(FoodController.addIngredienttoFood)
module.exports = router;
