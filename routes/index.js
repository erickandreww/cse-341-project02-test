const express = require('express');
const router = express.Router();
router.use('/', require('./swagger'))

router.get('/', (req, res) => {
    res.send('Hello')
})

router.use('/classes', require('./classes'))

router.use('/students', require('./students'))


module.exports = router;