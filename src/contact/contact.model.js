const mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({

    profilePicture : {
        type: String
    },
    fullName : {
        type: String
    },
    company: {
        type: String
    },
    jobTitle: {
        type: String
    },
    email : {
        type: String
    },
    phone : {
        type: String
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model("Contact", ContactSchema);
