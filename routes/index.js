const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const viewRouter = require('./view');

// Define routes using the controllers
router.get('/', homeController.home);
router.post('/upload', homeController.uploadCsv);

// Include the viewRouter for /view routes
router.use('/view', viewRouter);

module.exports = router;
