const router = require('express').Router();
const FoodController = require('../controllers/food-controller');
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.route('/foods')
    .post(FoodController.createFood) // to create new subordinate resources
    .get(FoodController.get) // to retrieve resource representation/information only

router.route('/foods/:foodId')
    .get(FoodController.getFood) // to retrieve resource representation/information only
    .put(FoodController.editFood) // to update existing resource
    .delete(FoodController.deleteFood)  // to delete resources
    .patch(()=>{}); // to make partial update on a resource

router.route('/image/:foodId')
    .post(upload.single('image'), FoodController.uploadImage)

router.route('/foods/:foodId/ingredients/:ingredientId')
    .post(FoodController.addIngredienttoFood)
    .put(FoodController.addManyIngredientstoFood)
    .delete(FoodController.removeIngredientsFromFood)

router.route('/foods/foodingredient')
    .post(FoodController.findFoodsByIngredients);

   
module.exports = router;
