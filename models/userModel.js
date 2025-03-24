const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema');

// Define the User model
const User = mongoose.model('User', userSchema);

module.exports ={ User};