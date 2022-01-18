// 1. Import required node modules and create router
const express = require('express');
const router = express.Router();

// 2. Import index controller
const indexController = require('../controllers/index.controller');

// 3. Create routers for index
// @router GET /
// @descri Renders index main page
// @access Public
router.get('/', indexController.Render);

// 4. Export index router
module.exports = router;
