/*Importing required frameworks and modules*/
const express = require('express');
const multer = require('multer');
const path = require('path');
const regRouter = express.Router();
const Registration = require('../models/Registration');
const UsersSchema = require('../models/UsersSchema');
const ProductSchema = require('../models/ProductSchema');

// Setting up storage engine.
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

// Initializing the upload variable.
const upload = multer({
    storage: storage,
}).single('image');

/* === ROUTING FOR THE URBAN FARMER === */
//Read operation during registration.
regRouter.get('/farmerRegistration', (req, res) => {
    res.render('farmerRegistration', { title: 'Ufarm |  Urban Farmer Registration' })
});

//Saving data to the database.
regRouter.post('/farmerRegistration', upload, async (req, res) => {
    try {
        const registration = new Registration(req.body);
        const usersSchema = new UsersSchema(req.body);
        registration.image = req.file.filename;
        await registration.save(registration);
        await UsersSchema.register(usersSchema, req.body.password);
        res.redirect('/login');
    }
    catch (err) {
        res.status(400).send('Sorry dear! Something seems wrong.')
        console.log({ message: err })
    }
});

// Retrieve data from the database. 
regRouter.get('/farmerDashboard', async (req, res) => {
    if (req.session.user) {
        try {
            let uFarmer = await Registration.find();
            if (req.query.firstName) {
                uFarmer = await Registration.find({ firstName: req.query.firstName })
            }
            res.render('farmerDashboard', { title: 'Ufarm | Farmer Dashboard', users: uFarmer, currentUser: req.session.user })
        } catch (err) {
            res.status(400).send("Unable to find farmer in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
})

// Deleting user.
regRouter.post('/farmerDashboard', async (req, res) => {
    if (req.session.user) {
        try {
            await Registration.deleteOne({ _id: req.body.id })
            res.redirect('back')
        } catch (err) {
            res.status(400).send("Sorry, unable to delete user in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
});

// Updating urban farmer information.
regRouter.get('/updateFarmerInfo/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const updateFarmer = await Registration.findOne({ _id: req.params.id })
            res.render('updateFarmerInfo', { user: updateFarmer })
        } catch (err) {
            res.status(400).send("Sorry, unable to find user in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
})

regRouter.post('/updateFarmerInfo', upload, async (req, res) => {
    if (req.session.user) {
        try {
            if (req.file) {
                const updateUser = await Registration.findOneAndUpdate({ _id: req.query.id }, req.body);
                updateUser.image = req.file.filename;
                await updateUser.save();
            } else {
                await Registration.findOneAndUpdate({ _id: req.query.id }, req.body);
            }
            res.redirect('farmerDashboard');
        } catch (err) {
            res.status(404).send("Sorry, unable to update user in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
})

// Displaying Urban farmers on our platform.
regRouter.get('/farmers', async(req, res) => {
    try{
        const ourFarmers = await Registration.find();
        res.render('farmers', { title: 'Ufarm | Urban Farmers', users: ourFarmers})
    }catch(err){
        res.status(400).send("Sorry, failed to get farmersi information")
    }
});

/*===ROUTING FOR PRODUCTS === */

// Retrieve product from the database. 
regRouter.get('/productDashboard', async (req, res) => {
    if (req.session.user) {
        try {
            let pdt = await ProductSchema.find();
            if (req.query.category) {
                pdt = await ProductSchema.find({ category: req.query.category })
            }
            res.render('productDashboard', { title: 'Ufarm | Product Dashboard', items: pdt, currentUser: req.session.user })
        } catch (err) {
            res.status(400).send("Unable to find product in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
});

// Deleting product from database.
regRouter.post('/productDashboard', async (req, res) => {
    if (req.session.user) {
        try {
            await ProductSchema.deleteOne({ _id: req.body.id })
            res.redirect('productDashboard')
        } catch (err) {
            res.status(400).send("Sorry, unable to delete user in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
});

// Updating product.
regRouter.get('/updateProductInfo/:id', async (req, res) => {
    if (req.session.user) {
        try {
                const updateItem = await ProductSchema.findOne({ _id: req.params.id });
                res.render('updateProductInfo', { item: updateItem })
        } catch (err) {
            res.status(400).send("Sorry, unable to find user in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
})

regRouter.post('/updateProductInfo', upload, async (req, res) => {
    if (req.session.user) {
        try {
            if (req.file) {
                const imgEdit = await ProductSchema.findOneAndUpdate({ _id: req.query.id }, req.body);
                imgEdit.image = req.file.filename;
                await imgEdit.save();
            } else {
                await ProductSchema.findOneAndUpdate({ _id: req.query.id }, req.body)
            }
            res.redirect('productDashboard');
        } catch (err) {
            res.status(404).send("Sorry, unable to update user in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
});

// Verifying product.
regRouter.get("/verifyInfo/:id", async (req, res) => {
    if (req.session.user) {
        try {
            const verifyItem = await ProductSchema.findOne({ _id: req.params.id });
            res.render("verifyInfo", { item: verifyItem })
        } catch (err) {
            res.status(400).send("Sorry, unable to find user in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
})

regRouter.post("/verifyInfo", async (req, res) => {
    if (req.session.user) {
        try {
            await ProductSchema.findOneAndUpdate({ _id: req.query.id }, req.body)
            res.redirect("productDashboard");
        } catch (err) {
            res.status(404).send("Sorry, unable to update user in the database");
        }
    } else {
        console.log("Can't find session")
        res.redirect('/login')
    }
});

//Exporting this regRouter module.
module.exports = regRouter;