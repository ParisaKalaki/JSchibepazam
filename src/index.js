const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
/**
 * Routes.
 */
const usersRouter = require('./routes/users');

// Add this after the middleware part
app.use('/api/v1', usersRouter);


function onStart(){
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

module.exports = app;


