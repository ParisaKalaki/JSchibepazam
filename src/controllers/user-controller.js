const userController ={};
const { Food, Ingredient } = require('../models')

function findOne(id) {
    return Food.findOne({
        where: {
            id
        }
    });
}

userController.createUser = (req, res, next) => {
    Food.create(req.body).then( u =>res.json(u))
        .catch(next);
};

userController.get = (req, res, next) => {
    console.log(Food);
    Food.findAll({
        include: [{
            model: Ingredient,
            attributes: ['name'],
          }],   
    }).then(foods => {
        res.json(foods)
    }).catch(next);
};

userController.getUser = (req, res, next) => {
    const id = req.params.userId;
    findOne(id).then(user => {
        if(user && user.length){
            res.json(user)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

userController.getUsers = (req, res, next) => {
    const id = req.params.userId;
    findOne(id).then(users => {
        if(users){
            res.json(users)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

userController.editUser = (req, res, next) => {
    const newUser = req.body;
    const id = newUser? newUser.id : undefined;
    findOne(id).then(user => {
        if (user) {
            Object.assign(user, newUser);
            user.save().then(user => res.json(user)).catch(next);
        }else {
            res.status(404).send();
        }
    }).catch(next);
};

userController.deleteUser = (req, res, next) => {
    const id = req.params.userId;
    findOne(id).then(user => {
        if (user) {
            user.destroy().then(res.status(200).send()).catch(next);
        }else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = userController;
