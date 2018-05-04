const express = require('express');
const router = express.Router();

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User " + req.user.username + " authenticated.");
        return next();
    } else {
        res.redirect('/unauthorised');
    }
};

const ifLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        return next();
    }
};

module.exports = function (passport) {
    /* GET Last Will & Testament - Page 1 (Executors) */
    router.get('/last-will-and-testament-executors', (req, res) => {
        res.render('forms/lwat/lwat-executors', {title: "Last Will & Testament"});
    });

    /* POST Database Last Will & Testament - Page 1 (Executors) */
    router.post('/save-last-will-and-testament-executors', (req, res) => {
        console.log("HIIIIIII");
        console.log()
    });

    return router;
};
