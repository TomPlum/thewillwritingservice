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
            "UPDATE Users SET username = ?, email = ?, first_name = ?, last_name = ?, title = ?, tel_mobile = ?, tel_home = ?, dob = ?, job_title = ?, employer = ?, nationality = ?, children_current = ?, children_previous = ?, children_minor = ?, marital_status = ?, address_line_1 = ?, address_line_2 = ?, town = ?, postcode = ?, property_duration = ? WHERE user_id = ?;",
            [
                req.body.username === '' ? null : req.body.username,
                req.body.email === '' ? null : req.body.email,
                req.body.first_name === '' ? null : req.body.first_name,
                req.body.last_name === '' ? null : req.body.last_name,
                req.body.title === '' ? null : req.body.title,
                req.body.tel_mobile === '' ? null : req.body.tel_mobile,
                req.body.tel_home === '' ? null : req.body.tel_home,
                req.body.date_of_birth === '' ? null : req.body.date_of_birth,
                req.body.job_title === '' ? null : req.body.title,
                req.body.employer === '' ? null : req.body.employer,
                req.body.nationality === '' ? null : req.body.nationality,
                req.body.children_current === '' ? null : req.body.children_current,
                req.body.children_previous === '' ? null : req.body.children_previous,
                req.body.children_minor === '' ? null : req.body.children_minor,
                req.body.marital_status === '' ? null : req.body.marital_status,
                req.body.address_line_one === '' ? null : req.body.address_line_one,
                req.body.address_line_two === '' ? null : req.body.address_line_two,
                req.body.town === '' ? null : req.body.town,
                req.body.postcode === '' ? null : req.body.postcode,
                req.body.property_duration === '' ? null : req.body.property_duration,
                req.user.user_id
            ],
            (err) => {
                if (err) {
                    res.send({error: err, success: null});
                } else {
                    res.send({error: null, success: true});
                }
            });
    });

    return router;
};