const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const swaggerRoute = require('./routes/swagger')
const { connectDatabase } = require('./models/userModel');
const usersRoute = require('./routes/userRoute');

connectDatabase();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', swaggerRoute);

// Routes
app.use('/', usersRoute);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is running and listening on http://localhost:${port}`);
});