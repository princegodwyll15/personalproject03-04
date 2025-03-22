const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports =userSchema;