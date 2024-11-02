const express = require('express');
const bodyParser = require('body-parser'); 
const mongodb = require('./data/database');
const createError = require('http-errors')
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Resquested-With, Content-Type, Accept, Z-Key'
    ); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

// routes
app.use('/', require('./routes/'))

// 404 handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
})

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500); 
    res.send({
        error: {
            status: err.status || 500, 
            message: err.message
        }
    })
});

const Port = process.env.Port || 3000

// mongodb connection init
mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    }
    else { 
        app.listen(Port, () => {console.log(`Database is listening and node Runign on Port ${Port}`)});
    }
})
