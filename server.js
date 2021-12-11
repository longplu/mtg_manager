// Require dependencies
const express = require('express');
const mongoose = require('mongoose');

const methodOverride = require('method-override');
const cardsRouter = require('./controllers/cards');

require('dotenv').config();



// Initialize app
const app = express();

// Set up app configuration
const PORT = process.env.PORT;

// Connect to Database
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
// Mongo DB event listeners
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Mount Middleware
app.use(express.urlencoded({extended: false})); //creates req.body

app.use(methodOverride('_method'));

// Mount Routes
app.use('/', cardsRouter);


// Listen on port 3000
app.listen(PORT, () => {
    console.log('Express is listening on port ' + PORT);
});

