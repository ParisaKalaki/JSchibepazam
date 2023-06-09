const ingredientController ={};
const { Food, Ingredient } = require('../models');



function findOne(id) {
    return Ingredient.findOne({
        where: {
            id
        }
    });
}

ingredientController.createIngredient = async (req, res, next) => {
     // Check if ingredient with the same name already exists
     const ingredient = await Ingredient.findOne({ where: { name: req.body.name } });
     console.log(ingredient)
     if (ingredient) {
         return res.json(ingredient); // Return existing ingredient
     }
    Ingredient.create(req.body).then( u =>res.json(u))
        .catch(next);
};

ingredientController.get = (req, res, next) => {
    Ingredient.findAll().then(Ingredients => {
        const count = Ingredients.length; // Get the actual count of items
        const range = `0-${count - 1}/*`; // Calculate the range
  
        res.setHeader('Content-Range', `bytes ${range}`); // Set the Content-Range header
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.json(Ingredients)
    }).catch(next);
};


ingredientController.getIngredient = (req, res, next) => {
    const id = req.params.ingredientId;
    findOne(id).then(ingredient => {
        if(ingredient){
            res.json(ingredient)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

ingredientController.editIngredient = (req, res, next) => {
    const newIngredient = req.body;
//   const id = newFood? newFood.id : undefined;
    const id = req.params.ingredientId;
    findOne(id).then(ingredient => {
        if (ingredient) {
            Object.assign(ingredient, newIngredient);
            ingredient.save().then(ingredient => res.json(ingredient)).catch(next);
        }else {
            res.status(404).send();
        }
    }).catch(next);
};

ingredientController.deleteIngredient = (req, res, next) => {
    const id = req.params.ingredientId;
    findOne(id).then(ingredient => {
        if (ingredient) {
            ingredient.destroy().then(res.status(200).send()).catch(next);
        }else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = ingredientController;
