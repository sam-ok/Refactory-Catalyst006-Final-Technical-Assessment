// Importing mongoose so as to use the Schema module.
const mongoose = require('mongoose');
// Setting up the registration schema.
const registrationSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    birthDay: {
        type: String
    },
    nin: {
        type: String
    },
    gender: String,
    ward: String,
    email: String,
    phone: {
        type: Number
    },
    product: [{
        type: String
    }],
    comment: String,
    payment: [{
        type: String
    }],
    delivery: [{
        type: String
    }],
    regDate: {
        type: String
    },
    image: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    termsConditions: String
}, { timestamps: true });

// Exporting schema.
module.exports = mongoose.model('Registration', registrationSchema);