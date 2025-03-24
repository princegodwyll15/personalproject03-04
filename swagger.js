const swaggerAutogen = require('swagger-autogen')();

const personal_api_project = {
    info: {
        title: "Users API Personal Project",
        description: "API for creating, deleting, and updating user data"
    },
    host: "localhost:4000", 
    schemes: ['http', 'https']
};

const outputFile = './swagger.json'; 
const endPointFiles = ['./routes/adminRoute.js', './routes/userRoute.js']; 

swaggerAutogen(outputFile, endPointFiles, personal_api_project).then(() => {
    console.log("Swagger documentation generated successfully!");
});