const mongodb = require('../data/database');
const createError = require('http-errors')
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose')

const getAllClasses = async (req,res) => {
    //#swagger.tags=['Classes']
    const result = await mongodb.getDatabase().db().collection('class').find();
    result.toArray().then((classes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classes);
    });
}

const getClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    const classId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('class').find({_id: classId});
        result.toArray().then((classes) => {
            if (!classes[0]) {
                return next(createError(404, 'class does not exist'))
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(classes[0])
        })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

const createClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    const newClass = {
        class_name: req.body.class_name, 
        class_floor: req.body.class_floor,
    }; 
    console.log(newClass)
    const classPath = await mongodb.getDatabase().db().collection('class');
    classPath.insertOne(newClass).then(result => { 
        if (classPath.acknowledged) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(newClass)
        }
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

const updateClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    const classId = new ObjectId(req.params.id);
    const newClass = {
        class_name: req.body.class_name, 
        class_floor: req.body.class_floor,
    }; 
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
            upsert: false
        }
    )
    .then(result => {
        if (!result) {
            return next(createError(404, 'class does not exist'))
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json('Class updated');
    })
    .catch((error) => {
        console.log(error.message);
        next(error);
    });
}

const deleteClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    const classId = new ObjectId(req.params.id);
    const classPath = await mongodb.getDatabase().db().collection('class');
    classPath.findOneAndDelete({_id: classId})
    .then(result => {
        if (!result) {
            return next(createError(404, 'class does not exist'))
        }
        res.json('Class Deleted');
    })
    .catch((error) => {
        console.log(error.message);
        next(error);
    });
}

module.exports = { getAllClasses, getClass, createClass, updateClass, deleteClass }