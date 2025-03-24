const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./data/database')
const swaggerRoute = require('./routes/swagger')
const adminRoute = require('./routes/adminRoute')
const usersRoute = require('./routes/userRoute');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


database.connectDatabase()


// Routes
app.use('/', adminRoute)
app.use('/', swaggerRoute);
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