const httpStatusCodes = require('../errorHandler/httpStatusCodes');
const BaseError = require('../errorHandler/baseError');

class Api404Error extends BaseError {
    constructor(
        name, 
        statusCode = httpStatusCodes.NOT_FOUND, 
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api400Error extends BaseError {
    constructor(
        name, 
        statusCode = httpStatusCodes.INTERNAL_SERVER, 
        description = 'Internal Server Error.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api500Error extends BaseError {
    constructor(
        name, 
        statusCode = httpStatusCodes.BAD_REQUEST, 
        description = 'Bad Request Error.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}



module.exports = { Api404Error, Api400Error, Api500Error }