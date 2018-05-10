const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User " + req.user.username + " authenticated.");
        return next();
    } else {
        res.redirect('/unauthorised');
    }
};

module.exports = function (passport) {
    router.post("/get-wills", isAuthenticated, (req, res) => {
        mysql.connection.query("SELECT * FROM LastWillAndTestament WHERE user_id = ?;", [req.user.user_id], (err, rows) => {
           if (err) {
               console.log(err);
           } else {
               res.send(rows);
           }
        });
    });

    router.post('/get-personal-information', isAuthenticated, (req, res) => {
        res.send(req.user);
    });

    router.post('/update-personal-information', isAuthenticated, (req, res) => {
        mysql.connection.query(
            "UPDATE Users SET username = ?, email = ?, first_name = ?, last_name = ? WHERE user_id = ?;",
            [
                req.body.username,
                req.body.email,
                req.body.first_name,
                req.body.last_name,
                req.user.user_id
            ],
            (err) => {
                if (err) {
                    res.send({error: err, success: null});
                } else {
                    res.send({error: null, success: true});
                }
            })
    });

    return router;
};