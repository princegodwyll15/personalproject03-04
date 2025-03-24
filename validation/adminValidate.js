const { body, validationResult } = require('express-validator');

const adminvalidationRules = () => {
    return [
        body('name')
            .isLength({ min: 2 }).withMessage("Enter an appropriate name"),
        body('employeeId')
            .isLength({ min: 7 }).withMessage("Enter a correct employeeId"),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    adminvalidationRules,
    validate,
};