const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = require('../schema/userSchema');

// Function to connect to the database
const connectDatabase = async () => {
    if (!process.env.Mongo_URL) {
        console.error("Error: Mongo_URL is not defined in the environment variables.");
        process.exit(1); // Exit the process if the MongoDB URL is missing
    }

    try {
        await mongoose.connect(process.env.Mongo_URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Define the User model
const User = mongoose.model('User', userSchema);

module.exports = { User, connectDatabase };