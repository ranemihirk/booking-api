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
        required: false,
        default: ''
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    userType: {
        type: Number,
        required: true
    },
    isOwner: {
        type: Boolean,
        required: true
    },
    isRestricted: {
        type: Boolean,
        required: true,
        default: CSSFontFeatureValuesRule
    }
},
    {
        timestamp: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;