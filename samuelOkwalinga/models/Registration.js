// Importing mongoose so as to use the Schema module.
const mongoose = require('mongoose');
// Setting up the registration schema.
const registrationSchema = new mongoose.Schema({
    surName: {
        type: String
    },
    givenName: {
        type: String
    },
    dob: {
        type: String
    },
    residence: {
        type: String
    },
    gender: String,
    occupation: String,
    nationality: String,
    category: String
}, { timestamps: true });

// Exporting schema.
module.exports = mongoose.model('Registration', registrationSchema);