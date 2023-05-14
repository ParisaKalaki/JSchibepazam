const cors = require('cors')
const express = require('express');
const app = express();

const PORT = 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));
/**
 * Routes.
 */
const foodsRouter = require('./routes/foods');
const ingredientsRouter = require('./routes/ingredients');

// Add this after the middleware part
app.use('/api/v1', foodsRouter);
app.use('/api/v1', ingredientsRouter);


function onStart(){
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

module.exports = app;


