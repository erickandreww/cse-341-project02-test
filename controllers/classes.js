const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllClasses = async (req,res) => {
    const result = await mongodb.getDatabase().db().collection('class').find();
    result.toArray().then((classes) => {
        res.status(200).json(classes);
    });
}

const getClass = async (req, res) => {
    const classId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('class').find({_id: classId});
    result.toArray().then((classes) => {
        res.status(200).json(classes[0]);
    });
}

const createClass = async (req, res) => {
    const newClass = {
        class_name: req.body.class_name, 
        class_floor: req.body.class_floor,
    }; 
    const classPath = await mongodb.getDatabase().db().collection('class');
    classPath.insertOne(newClass).then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))
}

const updateClass = async (req, res) => {
    const classId = new ObjectId(req.params.id);
    const classPath = await mongodb.getDatabase().db().collection('class');
    classPath.findOneAndUpdate(
        {_id: classId}, 
        {
            $set: {
                class_name: req.body.class_name, 
                class_floor: req.body.class_floor,
            },
        },
        {
            upsert: true
        }
    )
    .then(result => {
        console.log(result);
    })
    .catch(error => console.error(error));
}

const deleteClass = async (req, res) => {
    const classId = new ObjectId(req.params.id);
    const classPath = await mongodb.getDatabase().db().collection('class');
    classPath.deleteOne({_id: classId})
    .then(result => {
        res.json('Class Deleted');
    })
    .catch(error => console.log(error));
}

module.exports = { getAllClasses, getClass, createClass, updateClass, deleteClass }