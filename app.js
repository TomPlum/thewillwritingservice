//Import Packages
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

//Configure Views & Jade/Pug Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middleware Stack
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//const rootRoutes = ["/manage-booking", "/manage-pitches", "/manage-emails"];

//Express Static Routing
app.use(express.static(path.join(__dirname, 'public'))); // For /
//app.use(rootRoutes, express.static(path.join(__dirname, 'public'))); //For /x

//Configuring Passport
let passport = require('passport');
let expressSession = require('express-session');
app.use(expressSession({
    secret: 'thewillwritingpartnership',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 //1 Hour
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//Flash Messaging For Passport
let flash = require('connect-flash');
app.use(flash());

//Initialize Passport
let initPassport = require('./public/js/passport/passport-init');
initPassport(passport);

//Page Routing
const index = require('./routes/index')(passport);


app.use('/', index);

//Handle 404
app.use(function(req, res) {
    res.status(404);
    res.render('error', {
        title: '404 - Page Not Found',
        desc: 'Page Not Found',
        error: 404
    });
});

//Handle 500 - Must have an arity of 4, otherwise express falls back to default error handling
app.use(function(err, req, res, next) {
    res.status(500);
    console.log(err);
    res.render('error', {
        title: '500 - Internal Server Error',
        desc: 'Internal Server Error',
        error: 500
    });
});

//Export App
module.exports = app;
