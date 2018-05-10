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
    return ((req.isAuthenticated()) ? "<i class='fas fa-user'></i>&nbsp;" + req.user.username : "<a id='registerButton' href='#' role='button' data-toggle='modal' data-target='#login-modal' class='btn login-button'><span class='fas fa-fw fa-sign-in-alt'></span> Login</a>");
}

module.exports = function (passport) {
    /* GET Landing Page */
    router.get('/', (req, res) => {
        res.render('index', {title: "TheWillwritingPartnership", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Last Will & Testament Page */
    router.get('/wills', (req, res) => {
       res.render('wills', {title: "Wills", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Login Page */
    router.get('/login', (req, res) => {
       res.render('login', {title: "Login", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Unauthorised Page */
    router.get('/unauthorised', (req, res) => {
        res.render('unauthorised', {title: "Unauthorised Access"});
    });

    /* GET Profile Page */
    router.get('/profile', isAuthenticated, (req, res) => {
       res.render('profile', {title: "Profile", loggedIn: req.isAuthenticated(), username: getUsername(req)});
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

    /*Handle Logout */
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
};

