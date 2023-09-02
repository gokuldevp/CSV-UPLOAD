const express = require('express');
const router = express.Router();
const viewController = require('../controllers/view');

// Define a route to view a file using the viewController
router.get('/:id', viewController.viewFile);

module.exports = router;
