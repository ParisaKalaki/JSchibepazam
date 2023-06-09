const dotenv = require('dotenv')

const foodController ={}

const crypto = require('crypto')
const sharp = require('sharp')
const { S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3")

const { Food, Ingredient } = require('../models')
const { Sequelize } = require('sequelize')
var Op = Sequelize.Op;



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
function findManying(ids) {
    return Ingredient.findAll({
        where: {
              id: {[Op.in]: ids},
        }
    });
}


foodController.createFood = async (req, res, next) => {
    const food = await Food.findOne({ where: { name: req.body.name } });
    console.log(food)
    if (food) {
        return res.json(food); // Return existing ingredient
    }
    Food.create(req.body).then( foods =>{
        res.json(foods)})
        .catch(next);
};

foodController.get = (req, res, next) => {
    Food.findAll({
        include: [{
            model: Ingredient,
            attributes: ['id', 'name'],
            through: {
                attributes: []
              }
          }],   
    }).then(foods => {
        const count = foods.length; // Get the actual count of items
        const range = `0-${count - 1}/*`; // Calculate the range
  
        res.setHeader('Content-Range', `bytes ${range}`); // Set the Content-Range header
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
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

foodController.editFood = async (req, res, next) => {
    const newFood = req.body;
    console.log(req.body)
//   const id = newFood? newFood.id : undefined;
    const id = req.params.foodId;
    const ingredient_ids = await req.body.Ingredients.map(x => x.id);
    const ingredients = await findManying(ingredient_ids);
    findOne(id).then(food => {
        if (food) {
            console.log(food)
            Object.assign(food, newFood);
            food.setIngredients(ingredients)
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

foodController.removeIngredientsFromFood = async (req, res, next) => {
    const food_id = req.params.foodId;
    const ingredient_ids = req.body.ingredientsId;

    const ingredients = await findManying(ingredient_ids);

    findOne(food_id).then(food => {
        if(food){
             food.removeIngredients(ingredients).then(food => res.json(food)).catch(next);
        } else {
            res.status(404).send();
        }
    }).catch(next);
}

foodController.addIngredienttoFood = async (req, res, next) => {
    const food_id = req.params.foodId;
    const ingredient_id = req.params.ingredientId;

    const ingredient = await findOneing(ingredient_id);

    findOne(food_id).then(food => {
        if(food){
             food.addIngredient(ingredient).then(food => res.json(food)).catch(next);
        } else {
            res.status(404).send();
        }
    }).catch(next);
}
  
foodController.addManyIngredientstoFood = async (req, res, next) => {
    const food_id = req.params.foodId;
    const ingredient_ids = req.body.ingredientsId; // Assuming ingredient IDs are sent in the request body as an array
    const ingredients = await findManying(ingredient_ids);

    findOne(food_id).then(food => {
        if(food){
             food.addIngredients(ingredients).then(food => res.json(food)).catch(next);
        } else {
            res.status(404).send();
        }
    }).catch(next);
  };
  

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

    }).then(async foods => {
        const result = await foods.map(x => x.id);
        Food.findAll({
            where:{  id: {[Op.in]: result}},
            include: Ingredient
        }).then(selectedfoods =>{
        res.json(selectedfoods)
    })
    }).catch(next);
};
   
foodController.uploadImage = async (req, res, next) =>  {
    const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
    const file = req.file 
    const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1400, width: 1080, fit: "fill" })
    .toBuffer()

    dotenv.config()
    
    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_BUCKET_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const endpoint = process.env.AWS_ENDPOINT

    const s3Client = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        },
        endpoint
    })
    
    const fileName = generateFileName()
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: file.mimetype
    }
    
    // Send the upload to S3
    await s3Client.send(new PutObjectCommand(uploadParams));

    const id = req.params.foodId
        findOne(id).then(food => {
            if (food) {
                food.update({
                    image: fileName,
                })
                food.save().then(food => res.json(food)).catch(next);
            }else {
                res.status(404).send();
            }
        }).catch(next);
    }

    module.exports = foodController;
