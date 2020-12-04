// Importing required dependencies.
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.port || 3300;
const registrationRoutes = require('./routes/registrationRoutes');
// Initialising app.
const app = express();

//DB connection.
mongoose.connect(process.env.covidDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open:');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });

// Setting up our view engine - pug.
app.set("view engine", "pug");
// Configuring paths for the views directory.
app.set("views", path.join(__dirname, "views"));

// Setting up the static folder.
app.use(express.static(path.join(__dirname, 'public')));

// Checking time new request is incoming.
app.use((req, res, next) => {
    console.log('A new request received at ' + Date.now());
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// Routes.
app.use('/', registrationRoutes);


// Handling non-existent routes.
app.get('*', (req, res) => {
    res.send("Sorry dear, this page does not exist!")
});

// Setting up the server to listen-in on an available port.
app.listen(port, () => console.log(`Eavesdropping on port ${port}:`));