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
    router.get('/last-will-and-testament-executors', isAuthenticated, (req, res) => {
        res.render('forms/lwat/lwat-executors', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Last Will & Testament - Page 2 (Residual Estate) */
    router.get('/last-will-and-testament-residual-estate', isAuthenticated, (req, res) => {
        res.render('forms/lwat/lwat-residual-estate', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Last Will & Testament - Page 3 (Funeral Arrangements) */
    router.get('/last-will-and-testament-funeral-arrangements', isAuthenticated, (req, res) => {
        res.render('forms/lwat/lwat-funeral-arrangements', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Last Will & Testament - Page 4 (Payment) */
    router.get('/payment', isAuthenticated, (req, res) => {
        res.render('forms/payment2', {title: "Payment", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Last Will & Testament - Page 5 (Complete) */
    router.get('/last-will-and-testament-complete', isAuthenticated, (req, res) => {
        res.render('forms/lwat/lwat-complete', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* POST Create Last Will & Testament */
    router.post('/create-last-will-and-testament', isAuthenticated, (req, res) => {
        mysql.connection.query("INSERT INTO LastWillAndTestament (date, user_id, completed, progress) VALUES (?, ?, ?, ?)", [new Date(), req.user.user_id, 0, 1], err => {
            if (err) {
                console.log(err);
                res.send({error: err, success: null});
            } else {
                //Once the record above has successfully inserted, select its ID and send back to page
                mysql.connection.query("SELECT LAST_INSERT_ID();", (err, rows) => {
                    if (err) {
                        res.send({error: err, success: null});
                    } else {
                        res.send({error: null, success: true, lastWillAndTestamentId: rows[0]['LAST_INSERT_ID()'].toString()});
                    }
                });
            }
        });
    });

    /* POST Delete Last Will & Testament (That is in progress) */
    router.post('/delete-last-will-and-testament', isAuthenticated, (req, res) => {
        mysql.connection.query("DELETE FROM LastWillAndTestament WHERE lwat_id = ?;", [req.body.id], (err) => {
            if (err) {
                console.log(err);
                res.send({error: err, success: null});
            } else {
                res.status(200).send({error: null, success: true});
            }
        });
    });

    /* POST Database Last Will & Testament - Page 1 (Executors)
    * This function uses an asynchronous waterfall from the npm library 'async' to do the following;
    * 1: Insert an AppointmentOfExecutors row into the database.
    * 2: Select the last inserted ID from the database (from the record above).
    * 3: Uses npm 'node-async-loop' to iterate over the array of Executors and inserts a row for each one.
    * 4: Uses node-async-loop again to iterate over the array of ProfessionalExecutors and inserts a row for each.
    * 5: Updates the LastWillAndTestament record by setting it's AoE ID to that of the record we inserted above.
    * 6: Updates the LastWillAndTestament record by setting its progress values to 2 (For the next stage, residual estate)
    * 7: Finally, if all previous functions succeeded, it will send back an object to the AJAX call on the page.
    * */
    router.post('/save-last-will-and-testament-executors', isAuthenticated, (req, res) => {
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
                            parseInt(aoeID),
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
                                next(err);
                            } else {
                                next();
                            }
                        }
                    );
                }, err => {
                    if (err) {
                        console.log(err);
                        callback(null, aoeError, executorError, err, aoeID);
                    } else {
                        callback(null, aoeError, executorError, null, aoeID);
                    }
                });
            },
            (aoeError, executorError, profExecError, aoeID, callback) => {
                mysql.connection.query("UPDATE LastWillAndTestament SET aoe_id = ? WHERE lwat_id = ?;", [aoeID, req.body.lastWillAndTestamentId], err => {
                    if (err) {
                        callback(null, aoeError, executorError, profExecError, err, aoeID, req.body.lastWillAndTestamentId);
                    } else {
                        callback(null, aoeError, executorError, profExecError, null, aoeID, req.body.lastWillAndTestamentId);
                    }
                });
            },
            (aoeError, executorError, profExecError, updateLwatError, aoeID, lastWillAndTestamentId, callback) => {
                mysql.connection.query("UPDATE LastWillAndTestament SET progress = ? WHERE lwat_id = ?;", [2, lastWillAndTestamentId], err => {
                    if (err) {
                        callback(null, aoeError, executorError, profExecError, updateLwatError, err, aoeID, req.body.lastWillAndTestamentId);
                    } else {
                        callback(null, aoeError, executorError, profExecError, updateLwatError, null, aoeID, req.body.lastWillAndTestamentId);
                    }
                });
            }
        ], (err, aoeError, executorError, profExecError, updateLwatError, updateProgressError, aoeID, lastWillAndTestamentId) => {
            if (err) {console.log("NPM Async Waterfall Error:"); console.log(err);}
            if (aoeError) {console.log("Appointment of Executors Error:"); console.log(aoeError);}
            if (executorError) {console.log("Executor Error:"); console.log(executorError);}
            if (profExecError) {console.log("Professional Executor Error:"); console.log(profExecError);}
            if (updateLwatError) {console.log("Error Updating Last Will & Testament ID:"); console.log(updateLwatError);}
            if (updateProgressError) {console.log("Error Updating Progress:"); console.log(updateProgressError);}
            if (!aoeError && !executorError && !profExecError && !updateLwatError && !updateProgressError) {
                res.status(200).send({success: true, aoeID: aoeID, lastWillAndTestamentId: lastWillAndTestamentId});
            } else {
                res.status(200).send({success: false});
            }
        });
    });

    /* POST Save Residual Estate Form */
    router.post('/save-last-will-and-testament-residual-estate', isAuthenticated, (req, res) => {
        console.log(req.body.beneficiaries);
        console.log(req.body.reserveBeneficiaries);

        async.waterfall([
            callback => {
                mysql.connection.query(
                    "INSERT INTO ResidualEstate " +
                    "(notes, pass_to_spouse, distribute_residue, excluded_from_will, add_failed_gift) " +
                    "VALUES (?, ?, ?, ?, ?)",
                    [
                        req.body.notes,
                        req.body.pass_to_spouse,
                        req.body.distribute_residue,
                        req.body.excluded_from_will,
                        req.body.gift_fail
                    ],
                    err => {
                        if (err) {
                            console.log(err);
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
                if (req.body.reserveBeneficiaries) {
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
                                    next(err);
                                } else {
                                    next();
                                }
                            }
                        )
                    }, err => {
                        if (err) {
                            callback(null, residualEstateError, residualEstateId, beneficiaryError, err);
                        } else {
                            callback(null, residualEstateError, residualEstateId, beneficiaryError, null);
                        }
                    });
                } else {
                    callback(null, residualEstateError, residualEstateId, beneficiaryError, null);
                }
            },
            (residualEstateError, residualEstateId, beneficiaryError, reserveBeneficiaryError, callback) => {
                mysql.connection.query("UPDATE LastWillAndTestament SET residual_estate_id = ? WHERE lwat_id = ?;", [residualEstateId, req.body.lastWillAndTestamentId], err => {
                    if (err) {
                        callback(null, residualEstateError, residualEstateId, beneficiaryError, reserveBeneficiaryError, err, req.body.lastWillAndTestamentId);
                    } else {
                        callback(null, residualEstateError, residualEstateId, beneficiaryError, reserveBeneficiaryError, null, req.body.lastWillAndTestamentId);
                    }
                });
            },
            (residualEstateError, residualEstateId, beneficiaryError, reserveBeneficiaryError, updateResidualEstateIdError, lastWillAndTestamentId, callback) => {
                mysql.connection.query("UPDATE LastWillAndTestament SET progress = ? WHERE lwat_id = ?;", [3, lastWillAndTestamentId], err => {
                    if (err) {
                        callback(null, residualEstateError, residualEstateId, beneficiaryError, reserveBeneficiaryError, updateResidualEstateIdError, err, req.body.lastWillAndTestamentId);
                    } else {
                        callback(null, residualEstateError, residualEstateId, beneficiaryError, reserveBeneficiaryError, updateResidualEstateIdError, null, req.body.lastWillAndTestamentId);
                    }
                });
            }
        ], (err, residualEstateError, residualEstateId, beneficiaryError, reserveBeneficiaryError, updateResidualEstateIdError, updateProgressError, lastWillAndTestamentId) => {
            if (err) {console.log("NPM Async Waterfall Error:"); console.log(err);}
            if (residualEstateError) {console.log("Resdiual Estate Error:"); console.log(residualEstateError);}
            if (beneficiaryError) {console.log("Beneficiary Error:"); console.log(beneficiaryError);}
            if (reserveBeneficiaryError) {console.log("Reserve Beneficiary Error:"); console.log(reserveBeneficiaryError);}
            if (updateResidualEstateIdError) {console.log("Error Updating Residual Estate ID:"); console.log(updateResidualEstateIdError);}
            if (updateProgressError) {console.log("Error Updating Last Will & Testament Progress:"); console.log(updateProgressError);}
            if (!residualEstateError && !beneficiaryError && !reserveBeneficiaryError && ! updateResidualEstateIdError && !updateProgressError) {
                res.status(200).send({success: true, residualEstateId: residualEstateId, lastWillAndTestamentId: lastWillAndTestamentId});
            } else {
                res.status(200).send({success: false});
            }
        });
    });

    router.post('/save-last-will-and-testament-funeral-arrangements', isAuthenticated, (req, res) => {
        let t1 = req.body.testatorOne;
        let t2 = req.body.testatorTwo;
        console.log("Service Place: " + t1.service_place);
        async.waterfall([
            callback => {
                mysql.connection.query("INSERT INTO FuneralArrangements " +
                    "(arranged_with_one, reference_number_one, funding_method_one, body_donation_one, organ_donation_one, excluded_organs_one, cremation_required_one, burial_required_one, service_place_one, burial_cremation_place_one, ashes_buried_scattered_one, ashes_place_one, service_reqs_one, family_flowers_one, charity_donation_one, notes_one, arranged_with_two, reference_number_two, funding_method_two, body_donation_two, organ_donation_two, excluded_organs_two, cremation_required_two, burial_required_two, service_place_two, burial_cremation_place_two, ashes_buried_scattered_two, ashes_place_two, service_reqs_two, family_flowers_two, charity_donation_two, notes_two) " +
                    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
                    [
                        t1.pre_arrange,
                        t1.funeral_ref,
                        t1.how_funded,
                        t1.body_donation,
                        t1.organ_donation,
                        t1.excluded_organs,
                        t1.cremation_required,
                        t1.burial_required,
                        t1.service_place,
                        t1.burial_place,
                        t1.buried_scattered,
                        t1.buried_scattered_place,
                        t1.service_requirements,
                        t1.family_flowers,
                        t1.donation_flowers,
                        t1.notes,
                        t2.pre_arrange,
                        t2.funeral_ref,
                        t2.how_funded,
                        t2.body_donation,
                        t2.organ_donation,
                        t2.excluded_organs,
                        t2.cremation_required,
                        t2.burial_required,
                        t2.service_place,
                        t2.burial_place,
                        t2.buried_scattered,
                        t2.buried_scattered_place,
                        t2.service_requirements,
                        t2.family_flowers,
                        t2.donation_flowers,
                        t2.notes
                    ], err => {
                        if (err) {
                            callback(null, err);
                        } else {
                            callback(null, null);
                        }
                        
                    });
            },
            (funeralArrangementsError, callback) => {
                mysql.connection.query("SELECT LAST_INSERT_ID();", (err, rows) => {
                    if (err) {
                        console.log(err);
                        callback(null, funeralArrangementsError, null);
                    } else {
                        console.log("Last Inserted ID: " + rows[0]['LAST_INSERT_ID()']);
                        callback(null, funeralArrangementsError, rows[0]['LAST_INSERT_ID()'].toString());
                    }
                });
            },
            (funeralArrangementsError, funeralArrangementsId, callback) => {
                mysql.connection.query("UPDATE LastWillAndTestament SET funeral_id = ? WHERE lwat_id = ?;", [funeralArrangementsId, req.body.lastWillAndTestamentId], err => {
                    if (err) {
                        callback(null, funeralArrangementsError, funeralArrangementsId, err);
                    } else {
                        callback(null, funeralArrangementsError, funeralArrangementsId, null);
                    }
                });
            },
            (funeralArrangementsError, funeralArrangementsId, updateLwatError, callback) => {
                mysql.connection.query("UPDATE LastWillAndTestament SET progress = ? WHERE lwat_id = ?;", [4, req.body.lastWillAndTestamentId], err => {
                    if (err) {
                        callback(null, funeralArrangementsError, funeralArrangementsId, updateLwatError, err);
                    } else {
                        callback(null, funeralArrangementsError, funeralArrangementsId, updateLwatError, null);
                    }
                });
            }
        ], (err, funeralArrangementsError, funeralArrangementsId, updateLwatError, updateProgressError) => {
            if (err) {console.log("NPM Async Waterfall Error:"); console.log(err);}
            if (funeralArrangementsError) {console.log("Funeral Arrangements Error:"); console.log(funeralArrangementsError);}
            if (updateLwatError) {console.log("Error Updating Last Will & Testament:"); console.log(updateLwatError);}
            if (updateProgressError) {console.log("Error Updating Progress:"); console.log(updateProgressError);}
            if (!err && !funeralArrangementsError && ! updateLwatError && !updateProgressError) {
                res.status(200).send({success: true, funeralArrangementsId: funeralArrangementsId, lastWillAndTestamentId: req.body.lastWillAndTestamentId});
            } else {
                res.status(200).send({success: false});
            }
        })
    });

    /* POST Payment Gateway Form */
    router.post('/pay', isAuthenticated, (req, res) => {
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
                mysql.connection.query("UPDATE LastWillAndTestament SET completed = ? WHERE lwat_id = ?;", [1, req.body.lastWillAndTestamentId], err => {
                    if (err) {
                        res.send({error: err, stripeObject: charge});
                    } else {
                        res.send({error: null, stripeObject: charge});
                    }
                });
            }
        });
    });

    /* Generate Will PDF */
    router.post('/view-will-pdf', (req, res) => {
        mysql.connection.query(
            "SELECT * FROM LastWillAndTestament " +
            "INNER JOIN AppointmentOfExecutors ON LastWillAndTestament.aoe_id = AppointmentOfExecutors.aoe_id " +
            "INNER JOIN Executor ON Executor.aoe_id = AppointmentOfExecutors.aoe_id " +
            "INNER JOIN ProfessionalExecutor ON ProfessionalExecutor.aoe_id = AppointmentOfExecutors.aoe_id " +
            "INNER JOIN ResidualEstate ON LastWillAndTestament.residual_estate_id = ResidualEstate.residual_estate_id " +
            "INNER JOIN Beneficiary ON ResidualEstate.residual_estate_id = Beneficiary.residual_estate_id " +
            "INNER JOIN FuneralArrangements ON LastWillAndTestament.funeral_id = FuneralArrangements.funeral_id " +
            "WHERE user_id = ? AND LastWillAndTestament.lwat_id = ?;", [req.user.user_id, req.body.lastWillAndTestamentId], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {

                }
            });
    });

    return router;
};
