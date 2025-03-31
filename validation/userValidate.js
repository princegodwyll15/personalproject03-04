const { body, validationResult } = require('express-validator');

const userValidationRules = () => [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').notEmpty().isInt({ min:12}).withMessage('Age must be above 12 years'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { userValidationRules, validate };
