const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');
const async = require("async");
const asyncLoop = require('node-async-loop');
const bCrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User " + req.user.username + " authenticated.");
        return next();
    } else {
        res.redirect('/unauthorised');
    }
};

const loggedIn = function (req) {
    return req.isAuthenticated();
};

function getUsername(req) {
    return username = ((req.isAuthenticated()) ? "<i class='fas fa-user'></i>&nbsp;" + req.user.username : "<a id='registerButton' href='#' role='button' data-toggle='modal' data-target='#login-modal' class='btn login-button'><span class='fas fa-fw fa-sign-in-alt'></span> Login</a>");
}
module.exports = function (passport) {
    /* GET Landing Page */
    router.get('/', (req, res) => {
        res.render('index', {title: "TheWillwritingPartnership", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Last Will & Testament Page */
    router.get('/last-will-and-testament', (req, res) => {
       res.render('last-will-and-testament', {title: "Last Will & Testament"});
    });

    /* GET Login Page */
    router.get('/login', (req, res) => {
       res.render('login', {title: "Login"});
    });

    /* GET Unauthorised Page */
    router.get('/unauthorised', function (req, res) {
        res.render('unauthorised', {title: "Unauthorised Access"});
    });

    /* POST Login Page */
    router.post('/authenticate', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* POST Register Page */
    router.post('/register', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/',
        session: false,
        failureFlash: true
    }));

    return router;
};

