const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateUserLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateCarCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('pricePerDay').isFloat({ gt: 0 }).withMessage('Price per day must be a positive number'),
  body('category').optional().isString().withMessage('Category must be a string'),
];

const validateBooking = [
  body('carId').isInt().withMessage('Car ID must be an integer'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateCarCreation,
  validateBooking,
  validateRequest,
};