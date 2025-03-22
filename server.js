const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { connectDatabase } = require('./models/userModel');
const { userValidationRules, validate } = require('./validation/valiadate')
const usersRoute = require('./routes/userRoute');

connectDatabase();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Welcome to the API Home Page');
});

// API base route
app.get('/api', (req, res) => {
    res.send('Welcome to the API');
});


// Routes
app.use('/api', usersRoute);


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