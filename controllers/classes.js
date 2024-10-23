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

module.exports = { getAllClasses, getClass }