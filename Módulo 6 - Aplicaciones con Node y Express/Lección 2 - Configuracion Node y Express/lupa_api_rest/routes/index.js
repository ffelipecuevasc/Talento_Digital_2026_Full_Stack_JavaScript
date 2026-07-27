const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/conductores', apiController.getConductores);
router.get('/automoviles', apiController.getAutomoviles);
router.get('/conductoressinauto', apiController.getConductoresSinAuto);
router.get('/solitos', apiController.getSolitos);
router.get('/auto', apiController.getAuto);

module.exports = router;