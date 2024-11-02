// error handler

const BaseError = require("./baseError")

const logError = async (err) => {
    console.log(err)
}

function logErrorMiddleware (err, req, res, next) {
    logError(err)
    next(err)
}

const returnError = async (err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message)
}

const isOperationalError = async (error) => { 
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

module.exports = { logError, logErrorMiddleware, returnError, isOperationalError}