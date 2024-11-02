const mongodb = require('../data/database');
const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

const getAllStudents = async (req,res) => {
    //#swagger.tags=['Students']
    const result = await mongodb.getDatabase().db().collection('students').find();
    result.toArray().then((students) => {
        res.status(200).json(students);
    });
}

const getStudentById = async (req, res, next) => {
    //#swagger.tags=['Students']
    const studentId = new ObjectId(req.params.id);
    try {
    const result = await mongodb.getDatabase().db().collection('students').find({_id: studentId});
    result.toArray().then((students) => {
        if (!students[0]) {
            return next(createError(404, 'student does not exist'))
        }
        res.status(200).json(students[0]);
    })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

const addStudent = async (req, res, next) => {
    //#swagger.tags=['Students']
    const newStudent = {
        student_firstName: req.body.student_firstName, 
        student_lastName: req.body.student_lastName, 
        student_age: req.body.student_age, 
        student_gender: req.body.student_gender, 
        student_email: req.body.student_email,
        class_id: req.body.class_id, 
    }
    const studentPath = await mongodb.getDatabase().db().collection('students');
    studentPath.insertOne(newStudent).then(result => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error.message);
        if (error.name === 'ValidationError') {
            return next(createError(422, error.message))
        }
        next(error);
    });
}

const updateStudent = async (req, res, next) => {
    //#swagger.tags=['Students']
    const studentId = new ObjectId(req.params.id); 
    const studentPath = await mongodb.getDatabase().db().collection('students');
    studentPath.findOneAndUpdate(
        {_id: studentId}, 
        {
            $set: {
                student_firstName: req.body.student_firstName, 
                student_lastName: req.body.student_lastName, 
                student_age: req.body.student_age, 
                student_gender: req.body.student_gender, 
                student_email: req.body.student_email,
                class_id: req.body.class_id, 
            }, 
        }, 
        {
            upsert: false,
        }
    )
    .then(result => {
        if (!result) {
            return next(createError(404, 'student does not exist'))
        }
        console.log(result);
    })
    .catch((error) => {
        console.log(error.message);
        next(error);
    });
}

const deleteStudent = async (req, res, next) => {
    //#swagger.tags=['Students']
    const studentId = new ObjectId(req.params.id); 
    const studentPath = await mongodb.getDatabase().db().collection('students');
    studentPath.findOneAndDelete({_id: studentId})
    .then(result => {
        if (!result) {
            return next(createError(404, 'student does not exist'))
        }
        res.json('Student Deleted');
    })
    .catch((error) => {
        console.log(error.message);
        next(error);
    });
}

module.exports = { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent }