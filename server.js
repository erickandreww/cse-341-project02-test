const express = require('express');
const bodyParser = require('body-parser'); 
const mongodb = require('./data/database');
const dotenv = require('dotenv'); 
const createError = require('http-errors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const Port = process.env.Port || 3000
const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: "secret", 
    resave: false, 
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Resquested-With, Content-Type, Accept, Z-Key, Authorization'
    ); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
    next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({ origin: '*'}))

// routes
app.use('/', require('./routes/index.js'))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    }, 
    function(accessToken, refreshToken, profile, done) {
        //User.findIrCreate({ githubId: profile.id}, function (err, user) {
        return done(null, profile);
    // })
    }
));

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("Deserializing user ID:", user); 
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        console.log('in?')
        req.session.user = req.user;
        res.redirect('/');
    }
);

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

// mongodb connection init
mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    }
    else { 
        app.listen(Port, () => {console.log(`Database is listening and node Runign on Port ${Port}`)});
    }
})
