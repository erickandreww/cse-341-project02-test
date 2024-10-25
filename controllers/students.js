const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllStudents = async (req,res) => {
    const result = await mongodb.getDatabase().db().collection('students').find();
    result.toArray().then((students) => {
        res.status(200).json(students);
    });
}

const getStudentById = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({_id: studentId});
    result.toArray().then((students) => {
        res.status(200).json(students[0]);
    });
}

const addStudent = async (req, res) => {
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
    .catch(error => console.log(error));
}

const updateStudent = async (req, res) => {
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
            upsert: true,
        }
    )
    .then(result => {
        console.log(result);
    })
    .catch(error => console.log(error));
}

const deleteStudent = async (req, res) => {
    const studentId = new ObjectId(req.params.id); 
    const studentPath = await mongodb.getDatabase().db().collection('students');
    studentPath.deleteOne({_id: studentId})
    .then(result => {
        res.json('Student Deleted');
    })
    .catch(error => console.log(error));
}

module.exports = { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent }

// student_firstName, student_lastName, student_age, student_gender, student_email, student_class