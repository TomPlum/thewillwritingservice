const express = require('express');
const router = express.Router();
const async = require('async');
const mysql = require('../db/mysql');
const asyncLoop = require('node-async-loop');

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
        res.render('forms/lwat/lwat-executors', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* POST Database Last Will & Testament - Page 1 (Executors) */
    router.post('/save-last-will-and-testament-executors', (req, res) => {
        console.log("There are " + req.body.executors.length + " executors.");
        console.log("There are " + req.body.professionalExecutors.length + " professional executors.");
        console.log(req.body.executors);
        //console.log(req.body.professionalExecutors);
        //console.log(req.body.twp_to_act);
        //console.log(req.body.sole_or_joint);
        //console.log(req.body.spouse_to_the_executor);

        async.waterfall([
            callback => {
                mysql.connection.query(
                    "INSERT INTO AppointmentOfExecutors " +
                    "(spouse_to_the_executor, sole_or_joint, mirror_executors, twp_to_act) " +
                    "VALUES (?, ?, ?, ?)",
                    [
                        req.body.spouse_to_the_executor === "true",
                        req.body.sole_or_joint === "true",
                        req.body.mirror_executor === "true",
                        req.body.twp_to_act === "true"
                    ],
                    err => {
                        if (err) {
                            callback(null, err);
                        } else {
                            callback(null, null);
                        }
                    });
            },
            (aoeError, callback) => {
                mysql.connection.query("SELECT LAST_INSERT_ID();", (err, rows) => {
                    if (err) {
                        console.log(err);
                        callback(null, aoeError, null);
                    } else {
                        console.log("Last Inserted ID: " + rows[0]['LAST_INSERT_ID()']);
                        callback(null, aoeError, rows[0]['LAST_INSERT_ID()'].toString());
                    }
                });
            },
            (aoeError, aoeID, callback) => {
                console.log("AOE ID: " + aoeID);
                asyncLoop(req.body.executors, (executor, next) => {
                    console.log("Inserting executor...");
                    mysql.connection.query(
                        "INSERT INTO Executor " +
                        "(aoe_id, testator_one_relationship, testator_two_relationship, title, first_name, last_name, address_line_one, address_line_two, city, postcode, tel_mobile, tel_home, type) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                        [
                            parseInt(aoeID),
                            executor.testator_one_relationship.toString(),
                            executor.testator_two_relationship.toString(),
                            executor.title.toString(),
                            executor.first_name.toString(),
                            executor.last_name.toString(),
                            executor.address_line_one.toString(),
                            executor.address_line_two.toString(),
                            executor.town.toString(),
                            executor.postcode.toString(),
                            executor.tel_mobile.toString(),
                            executor.tel_home.toString(),
                            executor.type.toString()
                        ],
                        err => {
                            if (err) {
                                console.log(err);
                                next();
                            } else {
                                next();
                            }
                        }
                    );
                }, err => {
                    if (err) {
                        console.log(err);
                        callback(null, aoeError, aoeID, err);
                    } else {
                        callback(null, aoeError, aoeID, null);
                    }
                });
            },
            (aoeError, aoeID, executorError, callback) => {
                asyncLoop(req.body.professionalExecutors, (profExec, next) => {
                    console.log("Inserting Professional Executor...");
                    mysql.connection.query(
                        "INSERT INTO ProfessionalExecutor " +
                        "(aoe_id, firm_name, address_line_one, address_line_two, city, postcode, phone, type) " +
                        "VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
                        [
                            parseInt(aoeID).toString(),
                            profExec.firm_name.toString(),
                            profExec.address_line_one.toString(),
                            profExec.address_line_two.toString(),
                            profExec.town.toString(),
                            profExec.postcode.toString(),
                            profExec.phone.toString(),
                            profExec.type.toString()
                        ],
                        err => {
                            if (err) {
                                console.log(err);
                            } else {
                                next();
                            }
                        }
                    );
                }, err => {
                    if (err) {
                        console.log(err);
                        callback(aoeError, executorError, err, aoeID);
                    } else {
                        callback(aoeError, executorError, null, aoeID);
                    }
                });
            }
        ], (aoeError, executorError, profExecError, aoeID) => {
            if (aoeError) {console.log("Appointment of Executors Error:"); console.log(aoeError);}
            if (executorError) {console.log("Executor Error:"); console.log(executorError);}
            if (profExecError) {console.log("Professional Executor Error:"); console.log(profExecError);}
            if (!aoeError && !executorError && !profExecError) {
                res.status(200).send({success: true, aoeID: aoeID});
            } else {
                res.status(200).send({success: false});
            }
        });
    });

    /* GET Last Will & Testament  - Page 2 (Legacies) */
    router.get('/last-will-and-testament-legacies', (req, res) => {
       res.render('forms/lwat/lwat-legacies.pug', {title: "Last Will & Testament"});
    });

    return router;
};
