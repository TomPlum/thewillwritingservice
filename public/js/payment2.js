/*
The MIT License (MIT)

Copyright (c) 2015 William Hilton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
let $form = $('#payment-form');
$form.find('#sendPayment').on('click', payWithStripe);

/* If you're using Stripe for payments */
function payWithStripe(e) {
    e.preventDefault();

    /* Abort if invalid form data */
    if (!validator.form()) {
        return;
    }

    /* Visual feedback */
    $form.find('#sendPayment').html('<i class="fa fa-spinner fa-spin"></i> Validating ').prop('disabled', true);

    let PublishableKey = 'pk_test_5YmwuKfLl2zKOjnjnwCmEZmZ'; // Replace with your API publishable key
    Stripe.setPublishableKey(PublishableKey);

    /* Create token */
    let expiry = $form.find('[name=cardExpiry]').payment('cardExpiryVal');
    let ccData = {
        number: $form.find('[name=cardNumber]').val().replace(/\s/g,''),
        cvc: $form.find('[name=cardCVC]').val(),
        exp_month: expiry.month,
        exp_year: expiry.year
    };

    Stripe.card.createToken(ccData, function stripeResponseHandler(status, response) {
        if (response.error) {
            /* Visual feedback */
            $form.find('#sendPayment').html('Try again').prop('disabled', false);
            /* Show Stripe errors on the form */
            $form.find('.payment-errors').text(response.error.message);
            $form.find('.payment-errors').closest('.row').show();
        } else {
            /* Visual feedback */
            $form.find('#sendPayment').html('Processing <i class="fa fa-spinner fa-pulse"></i>');
            /* Hide Stripe errors on the form */
            $form.find('.payment-errors').closest('.row').hide();
            $form.find('.payment-errors').text("");
            let token = response.id;

            //Make AJAX call to server. Pass Stripe token.
            $.ajax({
                type: "POST",
                url: "/forms/pay",
                data: {token: token},
                success: function(response) {
                    if (response.error) {
                        $form.find('#sendPayment').html('There was a problem').removeClass('success').addClass('error');
                        /* Show Stripe errors on the form */
                        $form.find('.payment-errors').text('Try refreshing the page and trying again.');
                        $form.find('.payment-errors').closest('.row').show();
                    }

                    if (response.stripeObject) {
                        $form.find('#sendPayment').html('<i class="fa fa-check"></i> Payment Successful');
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }
    });
}
/* Fancy restrictive input formatting via jQuery.payment library*/
$('input[name=cardNumber]').payment('formatCardNumber');
$('input[name=cardCVC]').payment('formatCardCVC');
$('input[name=cardExpiry]').payment('formatCardExpiry');

/* Form validation using Stripe client-side validation helpers */
jQuery.validator.addMethod("cardNumber", function(value, element) {
    return this.optional(element) || Stripe.card.validateCardNumber(value);
}, "Please specify a valid credit card number.");

jQuery.validator.addMethod("cardExpiry", function(value, element) {
    //Parsing month/year uses jQuery.payment library
    value = $.payment.cardExpiryVal(value);
    return this.optional(element) || Stripe.card.validateExpiry(value.month, value.year);
}, "Invalid expiration date.");

jQuery.validator.addMethod("cardCVC", function(value, element) {
    return this.optional(element) || Stripe.card.validateCVC(value);
}, "Invalid CVC.");

validator = $form.validate({
    rules: {
        cardNumber: {
            required: true,
            cardNumber: true
        },
        cardExpiry: {
            required: true,
            cardExpiry: true
        },
        cardCVC: {
            required: true,
            cardCVC: true
        }
    },
    highlight: function(element) {
        $(element).closest('.form-control').removeClass('success').addClass('error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-control').removeClass('error').addClass('success');
    },
    errorPlacement: function(error, element) {
        $(element).closest('.form-group').append(error);
    }
});

paymentFormReady = function() {
    return !!($form.find('[name=cardNumber]').hasClass("success") && $form.find('[name=cardExpiry]').hasClass("success") && $form.find('[name=cardCVC]').val().length > 1);
};

$form.find('#sendPayment').prop('disabled', true);
let readyInterval = setInterval(function() {
    if (paymentFormReady()) {
        $form.find('#sendPayment').prop('disabled', false);
        clearInterval(readyInterval);
    }
}, 250);

function addTestData() {
    $("input[name='cardNumber']").val("4000056655665556");
    $("input[name='cardExpiry']").val("12 / 21");
    $("input[name='cardCVC']").val("083");
}