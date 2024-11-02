const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index')
const studentsController = require('../controllers/students');
const validator = require('../utilities/validation')

router.get('/', utilities.handleErrors(studentsController.getAllStudents));

router.get('/:id', utilities.handleErrors(studentsController.getStudentById));

router.post('/', 
    validator.studentValidationRules(),
    validator.checkValidation, 
    utilities.handleErrors(studentsController.addStudent)
);

router.put('/:id',
    validator.studentValidationRules(),
    validator.checkValidation,  
    utilities.handleErrors(studentsController.updateStudent)
); 

router.delete('/:id', utilities.handleErrors(studentsController.deleteStudent));



module.exports = router; 