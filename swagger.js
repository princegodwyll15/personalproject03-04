const swaggerAutogen = require('swagger-autogen')();

const personal_api_project = {
    info: {
        title: "Users Api Personal project",
        description: "API for creating, deleting and updating user data"
    },
    host: "localhost:4000",
    schemes: ['http', 'https'] // Ensure 'http' is included for localhost
};

const outputFile = './swagger.json';
const endPointFile = ["./routes/"]; // Include all route files

swaggerAutogen(outputFile, endPointFile, personal_api_project);