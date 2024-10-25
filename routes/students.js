const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const validator = require('../utilities/validation')

router.get('/', studentsController.getAllStudents);

router.get('/:id', studentsController.getStudentById);

router.post('/', 
    validator.studentValidationRules(),
    validator.checkValidation, 
    studentsController.addStudent
);

router.put('/:id',
    validator.studentValidationRules(),
    validator.checkValidation,  
    studentsController.updateStudent
); 

router.delete('/:id', studentsController.deleteStudent);



module.exports = router; 