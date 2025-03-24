const mongoose = require('mongoose');

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


module.exports={
    connectDatabase
}