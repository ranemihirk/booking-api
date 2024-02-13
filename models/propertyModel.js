const mongoose = require('mongoose');

// Property Schema
const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    propertyLocation: {
        type: String,
        required: true
    },
    propertyLocationURL: {
        type: String,
        required: false
    },
    propertyDesc: {
        type: String,
        required: false
    },
    propertyProfileImg: {
        type: String,
        required: false
    },
    propertyImages: {
        type: Array,
        required: false
    },
    maxOccupancy: {
        type: Number,
        required: true
    },
});

    const Property = mongoose.model('Property', propertySchema);

    module.exports = Property;