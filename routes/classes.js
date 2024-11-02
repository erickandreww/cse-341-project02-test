const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index')
const classesController = require('../controllers/classes');
const validator = require('../utilities/validation')

router.get('/', utilities.handleErrors(classesController.getAllClasses));

router.get('/:id', utilities.handleErrors(classesController.getClass));

router.post('/',
    validator.classValidationRules(),
    validator.checkValidation,  
    utilities.handleErrors(classesController.createClass)
);

router.put('/:id',
    validator.classValidationRules(),
    validator.checkValidation, 
    utilities.handleErrors(classesController.updateClass)
);

router.delete('/:id', utilities.handleErrors(classesController.deleteClass));


module.exports = router; 