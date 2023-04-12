const foodController ={};
const { Food, Ingredient } = require('../models')

function findOne(id) {
    return Food.findOne({
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

module.exports = foodController;
