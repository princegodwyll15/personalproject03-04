const express = require('express');
const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // Ensure this points to your valid swagger.json file

// Serve Swagger UI at /api-docs
router.use('/api-docs', swaggerUI.serve)
router.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = router;