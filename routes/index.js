const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/api-docs', require('./swagger'))

router.use('/classes', require('./classes'));

router.use('/students', require('./students'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log('out 1')
        res.redirect('/');
    });
});


module.exports = router;