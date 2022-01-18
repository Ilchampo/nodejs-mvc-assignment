// 1. Import required node modules and create router
const express = require('express');
const router = express.Router();

// 2. Import user controller
const itemController = require('../controllers/item.controller');

// 3. Create routers for user
// @router POST /items/create
// @descri Creates a new item
// @access Public
router.post('/create', itemController.Create);

// 4. Export user router
module.exports = router;
