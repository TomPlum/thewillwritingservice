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

    /* GET Last Will & Testament  - Page 2 (Legacies) */
    router.get('/last-will-and-testament-legacies', (req, res) => {
        res.render('forms/lwat/lwat-legacies.pug', {title: "Last Will & Testament", loggedIn: req.isAuthenticated(), username: getUsername(req)});
    });

    /* GET Payment Form */
    router.get('/payment', (req, res) => {
        res.render('forms/payment2', {title: "Payment", loggedIn: req.isAuthenticated(), username: getUsername(req)});
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
    /*
    router.post('/payment', (req, res) => {
        // Signature key entered on MMS. The demo accounts is fixed,
        // but merchant accounts can be updated from the MMS
        const key = 'Train37There28Metal';

        // Gateway URL
        const url = 'https://gateway.universaltp.com/direct/';

        // Form Detail Variables
        let cardNumber = $_POST["cardNumber"];
        let cardExpiryMonth = $_POST["cardExpiryMonth"];
        let cardExpiryYear = $_POST["cardExpiryYear"];
        let cardCVV = $_POST["cardCVC"];
        //let paymentTotal = $_POST["paymentTotal"];
        let paymentTotal = "100";

        let testCustomerName = "Thomas Plumpton";
        let testEmail = "Thomas.Plumpton@Hotmail.co.uk";
        let testPhone = "07736958320";
        let testAddress = "Unit 5 Pickwick Walk 120 Uxbridge Road Hatch End Middlesex";
        let testPostcode = "HA6 7HJ";

        console.log("Card Number: " + cardNumber + "\n");
        console.log("Card Expiry: " + cardExpiryMonth + "/" + cardExpiryYear + "\n");
        console.log("Card CV2: " + cardCVV + "\n");
        console.log("Payment Total: " + paymentTotal);
        // Request
        let request = {
            'merchantID': '101074',
            'action': 'SALE',
            'type': 1,
            'countryCode': 826,
            'currencyCode': 826,
            'amount': paymentTotal,
            'cardNumber': cardNumber,
            'cardExpiryMonth': cardExpiryMonth,
            'cardExpiryYear': cardExpiryYear,
            'cardCVV': cardCVV,
            'customerName': testCustomerName,
            'customerEmail': testEmail,
            'customerPhone': testPhone,
            'customerAddress': testAddress,
            'customerPostCode': testPostcode,
            'orderRef': 'Test Payment',
            'transactionUnique': $_REQUEST['transactionUnique'] ? $_REQUEST['transactionUnique'] : uniqid(),
            'threeDSMD': $_REQUEST['MD'] ? $_REQUEST['MD'] : null,
            'threeDSPaRes': $_REQUEST['PaRes'] ? $_REQUEST['PaRes'] : null,
            'threeDSPaReq': $_REQUEST['PaReq'] ? $_REQUEST['PaReq'] : null
        };

        // Create the signature using the function called below.
        request['signature'] = createSignature(request, key);

        // Initiate and set curl options to post to the gateway
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($req));
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Send the request and parse the response
        parse_str(curl_exec($ch), $res);

        // Close the connection to the gateway
        curl_close($ch);

        // Check the return signature
        if (isset($res['signature'])) {
            $signature = $res['signature'];
            // Remove the signature as this isn't hashed in the return
            unset($res['signature']);

            if ($signature !== createSignature($res, $key)) {
                // You should exit gracefully
                die('Sorry, the signature check failed');
            }
        }

        // Check the response code
        if ($res['responseCode'] == 65802) {
            // Send details to 3D Secure ACS and the return here to repeat request
            $pageUrl = (@$_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://';

            if ($_SERVER['SERVER_PORT'] != '80') {
                $pageUrl .= $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . $_SERVER['REQUEST_URI'];
            } else {
                $pageUrl .= $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
            }
            echo "<p>Your transaction requires 3D Secure Authentication</p>" .
            "<div class='container'>" .
            "<div class='row'>" .
            "<form action='" . htmlentities($res['threeDSACSURL']) . "' method='post'>" .
            "<input type='hidden' name='MD' value='" . htmlentities($res['threeDSMD']) . "'>" .
            "<input type='hidden' name='PaReq' value='" . htmlentities($res['threeDSPaReq']) . "'>" .
            "<input type='hidden' name='TermUrl' value='" . htmlentities($pageUrl) . "'>" .
            "<input type='submit' value='Continue'>" .
            "</form>" .
            "</div>" .
            "</div>";
        } else if ($res['responseCode'] === "0") {
            echo "<p>Thank you for your payment.</p>";
        } else {
            echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
        }

        function createSignature(array $data, $key) {
            // Sort by field name
            ksort($data);

            // Create the URL encoded signature string
            $ret = http_build_query($data, '', '&');

            // Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
            $ret = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $ret);

            // Hash the signature string and the key together
            $ret = hash('SHA512', $ret . $key);

            return $ret;
        } 
    });
    */
    return router;
};
