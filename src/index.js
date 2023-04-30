const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
/**
 * Routes.
 */
const foodsRouter = require('./routes/foods');
const ingredientsRouter = require('./routes/ingredients');
const imagesRouter = require('./routes/image');


// Add this after the middleware part
app.use('/api/v1', foodsRouter);
app.use('/api/v1', ingredientsRouter);
app.use('/api/v1', imagesRouter);



function onStart(){
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

module.exports = app;


