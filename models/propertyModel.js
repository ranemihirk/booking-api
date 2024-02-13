const mongoose = require('mongoose');

// Property Schema
const propertySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
        required: false,
        default: ''
    },
    propertyDesc: {
        type: String,
        required: false,
        default: ''
    },
    propertyProfileImg: {
        type: String,
        required: false,
        default: ''
    },
    propertyImages: {
        type: Array,
        required: false,
        default: []
    },
    maxOccupancy: {
        type: Number,
        required: true
    },
});

    const Property = mongoose.model('Property', propertySchema);

    module.exports = Property;