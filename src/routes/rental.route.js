// 1. Import required node modules and create router
const express = require('express');
const router = express.Router();

// 2. Import user controller
const rentalController = require('../controllers/rental.controller');

// 3. Create routers for user
// @router POST /rentals/create/:user/:item
// @descri Creates a new user
// @access Public
router.post('/create/:user/:item', rentalController.Create);

// @router POST /rentals/calculate
// @descri Creates a new user
// @access Public
router.post('/calculate', rentalController.Calculate);

// 4. Export user router
module.exports = router;
