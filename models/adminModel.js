const mongoose = require('mongoose');
const adminSchema = require('../schema/adminSchema');



const adminDatabase = mongoose.model("admin", adminSchema)

module.exports = { adminDatabase };