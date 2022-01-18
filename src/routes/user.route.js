// 1. Import required node modules and create router
const express = require('express');
const router = express.Router();

// 2. Import user controller
const userController = require('../controllers/user.controller');

// 3. Create routers for user
// @router POST /users/create
// @descri Creates a new user
// @access Public
router.post('/create', userController.Create);

// 4. Export user router
module.exports = router;
