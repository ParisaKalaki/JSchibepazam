const router = require('express').Router();
const IngredientController = require('../controllers/ingredient-controller');

router.route('/ingredients')
    .post(IngredientController.createIngredient) // to create new subordinate resources
    .get(IngredientController.get); // to retrieve resource representation/information only

router.route('/ingredients/:ingredientId')
    .get(IngredientController.getIngredient) // to retrieve resource representation/information only
    .put(IngredientController.editIngredient) // to update existing resource
    .delete(IngredientController.deleteIngredient)  // to delete resources
    .patch(()=>{}); // to make partial update on a resource

module.exports = router;
