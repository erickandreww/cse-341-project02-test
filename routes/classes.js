const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classes');

router.get('/', classesController.getAllClasses);

router.get('/:id', classesController.getClass);


module.exports = router; 