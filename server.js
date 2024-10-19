const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

app.use(bodyParser.json());
// app.use((req, res, next) => {
//     next();
// })

app.use('/', require('./routes/'))

const Port = process.env.Port || 3000

app.listen(Port, () => {
    console.log(`Database is listening and node Runign on Port ${Port}`);
})