const express = require('express');
const router = express.Router();
const async = require('async');
const mysql = require('../db/mysql');
const asyncLoop = require('node-async-loop');
const stripe = require('stripe')("sk_test_NpIgGpeWZ46KgMD14XQt8cNQ");

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

function getUsername(req) {
    return ((req.isAuthenticated()) ? "<i class='fas fa-user'></i>&nbsp;" + req.user.username : "<a id='registerButton' href='#' role='button' data-toggle='modal' data-target='#login-modal' class='btn login-button'><span class='fas fa-fw fa-sign-in-alt'></span> Login</a>");
}

module.exports = function (passport) {
    /* GET Last Will & Testament - Page 1 (Executors) */
    router.get('/last-will-and-testament-executors', (req, res) => {
        res.render('forms/lwat/lwat-executors', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Last Will & Testament  - Page 2 (Legacies) */
    router.get('/last-will-and-testament-legacies', (req, res) => {
        res.render('forms/lwat/lwat-legacies.pug', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Last Will & Testament - Page 3 (Residual Estate) */
    router.get('/last-will-and-testament-residual-estate', (req, res) => {
        res.render('forms/lwat/lwat-residual-estate', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Payment Form */
    router.get('/payment', (req, res) => {
        res.render('forms/payment2', {title: "Payment", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* POST Create Last Will & Testament */
    router.post('/create-last-will-and-testament', (req, res) => {
        mysql.connection.query("INSERT INTO LastWillAndTestament (date, user_id, completed, progress) VALUES (?, ?, ?, ?)", [new Date(), req.user.user_id, 0, 1], err => {
            if (err) {
                console.log(err);
                res.send({error: err, succes: null});
            } else {
                res.send({error: null, success: true});
            }
        });
    });

    /* POST Delete Last Will & Testament (That is in progress) */
    router.post('/delete-last-will-and-testament', (req, res) => {
        mysql.connection.query("DELETE FROM LastWillAndTestament WHERE user_id = ?;", [req.user.user_id], (err) => {
            if (err) {
                console.log(err);
                res.send({error: err, success: null});
            } else {
                res.status(200).send({error: null, success: true});
            }
        });
    });

    /* POST Database Last Will & Testament - Page 1 (Executors)
    * This function uses an asynchronous loop from the npm library 'async' to do the following;
    * 1: Insert a AppointmentOfExecutors row into the database
    * 2: Select the last inserted ID from the database (from the record above)
    * 3: Uses npm 'node-async-loop' to iterate over the array of Executors and inserts a row for each one
    * 4: Uses node-async-loop again to iterate over the array of ProfessionalExecutors and inserts a row for each
    * 5: Finally, if all previous functions succeeded, it will send back a message to the page.
    * */
    router.post('/save-last-will-and-testament-executors', (req, res) => {
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

    /* POST Save Residual Estate Form */
    router.post('/save-last-will-and-testament-residual-estate', (req, res) => {
        console.log(req.body.beneficiaries);
        console.log(req.body.reserveBeneficiaries);

        async.waterfall([
            callback => {
                mysql.connection.query(
                    "INSERT INTO ResidualEstate " +
                    "(notes, pass_to_spouse, distribute_residue, excluded_from_will, add_failed_gift) " +
                    "VALUES (?, ?, ?, ?, ?)",
                    [
                        req.body.notes === "true",
                        req.body.pass_to_spouse === "true",
                        req.body.distribute_residue === "true",
                        req.body.excluded_from_will.toString()
                    ],
                    err => {
                        if (err) {
                            callback(null, err);
                        } else {
                            callback(null, null);
                        }
                    });
            },
            (residualEstateError, callback) => {
                mysql.connection.query("SELECT LAST_INSERT_ID();", (err, rows) => {
                    if (err) {
                        console.log(err);
                        callback(null, residualEstateError, null);
                    } else {
                        console.log("Last Inserted ID: " + rows[0]['LAST_INSERT_ID()']);
                        callback(null, residualEstateError, rows[0]['LAST_INSERT_ID()'].toString());
                    }
                });
            },
            (residualEstateError, residualEstateId, callback) => {
                asyncLoop(req.body.beneficiaries, (beneficiary, next) => {
                    mysql.connection.query(
                        "INSERT INTO Beneficiary " +
                        "(residual_estate_id, testator_one_relationship, testator_two_relationship, title, first_name, last_name, address_line_one, address_line_two, city, postcode, tel_mobile, tel_home, share_to_beneficiary, share_age, issue, issue_age, reserve) " +
                        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                        [
                            parseInt(residualEstateId),
                            beneficiary.testator_one_relationship.toString(),
                            beneficiary.testator_two_relationship.toString(),
                            beneficiary.title.toString(),
                            beneficiary.first_name.toString(),
                            beneficiary.last_name.toString(),
                            beneficiary.address_line_one.toString(),
                            beneficiary.address_line_two.toString(),
                            beneficiary.town.toString(),
                            beneficiary.postcode.toString(),
                            beneficiary.tel_mobile.toString(),
                            beneficiary.tel_home.toString(),
                            beneficiary.share_to_beneficiary.toString(),
                            beneficiary.share_age.toString(),
                            beneficiary.issue.toString(),
                            beneficiary.issue_age.toString(),
                            0 //NOT RESERVE
                        ],
                        err => {
                            if (err) {
                                console.log(err);
                            } else {
                                next();
                            }
                        }
                    )
                }, err => {
                    if (err) {
                        callback(null, residualEstateError, residualEstateId, err);
                    } else {
                        callback(null, residualEstateError, residualEstateId, null);
                    }
                });
            },
            (residualEstateError, residualEstateId, beneficiaryError, callback) => {
                asyncLoop(req.body.reserveBeneficiaries, (beneficiary, next) => {
                    mysql.connection.query(
                        "INSERT INTO Beneficiary " +
                        "(residual_estate_id, testator_one_relationship, testator_two_relationship, title, first_name, last_name, address_line_one, address_line_two, city, postcode, tel_mobile, tel_home, share_to_beneficiary, share_age, issue, issue_age, reserve) " +
                        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                        [
                            parseInt(residualEstateId),
                            beneficiary.reserve_testator_one_relationship.toString(),
                            beneficiary.reserve_testator_two_relationship.toString(),
                            beneficiary.reserve_title.toString(),
                            beneficiary.reserve_first_name.toString(),
                            beneficiary.reserve_last_name.toString(),
                            beneficiary.reserve_address_line_one.toString(),
                            beneficiary.reserve_address_line_two.toString(),
                            beneficiary.reserve_town.toString(),
                            beneficiary.reserve_postcode.toString(),
                            beneficiary.reserve_tel_mobile.toString(),
                            beneficiary.reserve_tel_home.toString(),
                            beneficiary.reserve_share_to_beneficiary.toString(),
                            beneficiary.reserve_share_age.toString(),
                            beneficiary.reserve_issue.toString(),
                            beneficiary.reserve_issue_age.toString(),
                            1 //IS A RESERVE
                        ],
                        err => {
                            if (err) {
                                console.log(err);
                            } else {
                                next();
                            }
                        }
                    )
                }, err => {
                    if (err) {
                        callback(residualEstateError, residualEstateId, beneficiaryError, err);
                    } else {
                        callback(residualEstateError, residualEstateId, beneficiaryError, null);
                    }
                });
            }
        ], (residualEstateError, residualEstateId, beneficiaryError, reserveBeneficiaryError) => {

        });
    });

    /* POST Payment Gateway Form */
    router.post('/pay', (req, res) => {
        const token = req.body.token;
        const charge = stripe.charges.create({
            amount: 100,
            currency: 'gbp',
            description: "TWP Test Charge",
            source: token
        }, (err, charge) => {
            if (err) {
                res.send({error: err, stripeObject: null});
            } else {
                res.send({error: null, stripeObject: charge});
            }
        });
    });

    return router;
};
