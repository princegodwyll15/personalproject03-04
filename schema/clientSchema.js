const mongoose = require('mongoose')


const clientSchema = new mongoose.Schema({
    client_name:{
        type: string
    }
})