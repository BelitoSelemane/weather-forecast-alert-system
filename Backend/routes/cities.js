const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const citiesController = require('../controllers/citiesController');

router.get('/', citiesController.getAllCities);
router.get('/:id', citiesController.getCityById);
router.post('/', verifyToken, citiesController.createCity);
router.put('/:id', verifyToken, citiesController.updateCity);
router.delete('/:id', verifyToken, citiesController.deleteCity);

module.exports = router;