<?php
    echo "INSIDE PAYMENT PHP";
    // Signature key entered on MMS. The demo accounts is fixed,
    // but merchant accounts can be updated from the MMS
    $key = 'Train37There28Metal';

    // Gateway URL
    $url = 'https://gateway.universaltp.com/direct/';

    // Form Detail Variables
    $cardNumber = $_POST["cardNumber"];
    $cardExpiryMonth = $_POST["cardExpiryMonth"];
    $cardExpiryYear = $_POST["cardExpiryYear"];
    $cardCVV = $_POST["cardCVC"];
    //$paymentTotal = $_POST["paymentTotal"];
    $paymentTotal = "100";

    $testCustomerName = "Thomas Plumpton";
    $testEmail = "Thomas.Plumpton@Hotmail.co.uk";
    $testPhone = "07736958320";
    $testAddress = "Unit 5 Pickwick Walk 120 Uxbridge Road Hatch End Middlesex";
    $testPostcode = "HA6 7HJ";

    echo "Card Numnber: " . $cardNumber . "\n";
    echo "Card Expiry: " . $cardExpiryMonth . "/" . $cardExpiryYear . "\n";
    echo "Card CV2: " . $cardCVV . "\n";
    echo "Payment Total: " . $paymentTotal;

    // Request
    $req = array(
        'merchantID' => '101074',
        'action' => 'SALE',
        'type' => 1,
        'countryCode' => 826,
        'currencyCode' => 826,
        'amount' => $paymentTotal,
        'cardNumber' => $cardNumber,
        'cardExpiryMonth' => $cardExpiryMonth,
        'cardExpiryYear' => $cardExpiryYear,
        'cardCVV' => $cardCVV,
        'customerName' => $testCustomerName,
        'customerEmail' => $testEmail,
        'customerPhone' => $testPhone,
        'customerAddress' => $testAddress,
        'customerPostCode' => $testPostcode,
        'orderRef' => 'Test Payment',
        'transactionUnique' => (isset($_REQUEST['transactionUnique']) ?
    $_REQUEST['transactionUnique'] : uniqid()),
        'threeDSMD' => (isset($_REQUEST['MD']) ? $_REQUEST['MD'] : null),
        'threeDSPaRes' => (isset($_REQUEST['PaRes']) ? $_REQUEST['PaRes'] : null),
        'threeDSPaReq' => (isset($_REQUEST['PaReq']) ? $_REQUEST['PaReq'] : null)
    );

    // Create the signature using the function called below.
    $req['signature'] = createSignature($req, $key);

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
