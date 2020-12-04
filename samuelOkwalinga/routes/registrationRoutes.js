/*Importing required frameworks and modules*/
const express = require('express');
const path = require('path');
const regRouter = express.Router();
const Registration = require('../models/Registration');


/* === ROUTING === */
//Read operation during registration.
regRouter.get('/', (req, res) => {
    res.render('index', { title: 'Registration form' })
});

//Saving data to the database.
regRouter.post('/regestrationForm', async (req, res) => {
    try {
        const registration = new Registration(req.body);
        await registration.save(registration);
        res.redirect('/');
    }
    catch (err) {
        res.status(400).send('Sorry dear! Something seems wrong.')
        console.log({ message: err })
    }
});

// Retrieve data from the database. 
// regRouter.get('/userDashboard', async (req, res) => {
//     if (req.session.user) {
//         try {
//             let patient = await Registration.find();
//             res.render('userDashboard', { title: 'User Dashboard', users: patient, currentUser: req.session.user })
//         } catch (err) {
//             res.status(400).send("Unable to find user in the database");
//         }
//     } else {
//         console.log("Can't find session")
//         res.redirect('/')
//     }
// })



//Exporting this regRouter module.
module.exports = regRouter;