const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter last name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    image: {
        type: String,
        required: false
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
},
    {
        timestamp: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;