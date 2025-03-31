const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "admin",
    },
    employeeId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = adminSchema;