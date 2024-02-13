const mongoose = require('mongoose');

// Booking Schema
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    // You can add more fields here as needed, e.g., booking status, resource booked, etc.
},
    {
        timestamp: true
    });

    const Booking = mongoose.model('Booking', bookingSchema);

    module.exports = Booking;