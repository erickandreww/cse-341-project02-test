const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classes');
const validator = require('../utilities/validation')

router.get('/', classesController.getAllClasses);

router.get('/:id', classesController.getClass);

router.post('/',
    validator.classValidationRules(),
    validator.checkValidation,  
    classesController.createClass
);

router.put('/:id',
    validator.classValidationRules(),
    validator.checkValidation, 
    classesController.updateClass
);

router.delete('/:id', classesController.deleteClass);


module.exports = router; 