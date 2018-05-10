let beneficiaries = 1;
let reserves = 1;

function addBeneficiary() {
    console.log("LOL");
    if (beneficiaries === 4) {
        alert("You can only add a maximum of four beneficiaries");
    } else {
        beneficiaries++;

        let beneficiary = "<div id='beneficiary_" + beneficiaries + "'>" +
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<h2>Details of " + beneficiaries + "<sup>" + getOrdinalSuffix(beneficiaries) + "</sup> Beneficiary</h2>" +
            "</div>" +
            "</div>" +
            "<div class='row beneficiary-details'>" +
            "<div class='col-md-6'>" +
            "<!-- Relationship to 1st & 2nd Testators-->" +
            "<div class='row'>" +
            "<div class='col-sm-6'>" +
            "<label>Relationship to 1<sup>st</sup> Testator</label>" +
            "<input name='relationship_testator_one_" + beneficiaries + "' type='text' placeholder='Relationship' class='form-control'/>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label>Relationship to 2<sup>nd</sup> Testator</label>" +
            "<input name='relationship_testator_two_" + beneficiaries + "' type='text' placeholder='Relationship' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "<!-- Title, Forename, Surname-->" +
            "<div class='row'>" +
            "<div class='col-sm-2'>" +
            "<label for='title'>Title</label>" +
            "<select id='title' class='form-control'>" +
            "<option name='title_" + beneficiaries + "' value='mr'>Mr</option>" +
            "<option name='title_" + beneficiaries + "' value='mrs'>Mrs</option>" +
            "<option name='title_" + beneficiaries + "' value='miss'>Miss</option>" +
            "<option name='title_" + beneficiaries + "' value='ms'>Ms</option>" +
            "</select>" +
            "</div>" +
            "<div class='col-sm-4'>" +
            "<label>Forename</label>" +
            "<input type='text' name='first_name_" + beneficiaries + "' placeholder='Forename' required='' class='form-control'/>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label>Surname</label>" +
            "<input type='text' name='last_name_" + beneficiaries + "' placeholder='Surname' required='' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "<!-- Phone Numbers (Mobile & Home)-->" +
            "<div class='row'>" +
            "<div class='col-sm-6'>" +
            "<label>Tel (Mobile)</label>" +
            "<input type='text' name='tel_mobile_" + beneficiaries + "' placeholder='Mobile Telephone' class='form-control'/>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label>Tel (Home)</label>" +
            "<input type='text' name='tel_home_" + beneficiaries + "' placeholder='Home Telephone' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "<!--Share to Beneficiary?-->" +
            "<div class='row'>" +
            "<div class='col-xs-6'>" +
            "<label>Share to Beneficiary?</label>" +
            "<input type='text' name='share_to_beneficiary_" + beneficiaries + "' placeholder='Percentage' class='form-control'/>" +
            "</div>" +
            "<div class='col-xs-6'>" +
            "<label>At Age</label>" +
            "<input type='text' name='share_age_" + beneficiaries + "' placeholder='Age' class='form-control'/>" +
            "</div>" +
            "<div class='col-xs-6'>" +
            "<label>Or to Issue?</label>" +
            "<div class='row'>" +
            "<div class='col-xs-6'>" +
            "<div class='radio'>" +
            "<label>" +
            "<input checked='' type='radio' name='to_issue_" + beneficiaries + "' value='true'/> Yes" +
            "</label>" +
            "</div>" +
            "</div>" +
            "<div class='col-xs-6'>" +
            "<div class='radio'>" +
            "<label>" +
            "<input type='radio' name='to_issue_" + beneficiaries + "' value='false'/> No" +
            "</label>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='col-xs-6'>" +
            "<label>At Age</label>" +
            "<input type='text' name='to_issue_age_" + beneficiaries + "' placeholder='Age' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<!-- Address-->" +
            "<div class='col-md-6'>" +
            "<label>Address Line 1</label>" +
            "<input type='text' name='address_line_1_" + beneficiaries + "' placeholder='Address Line 1' required='' class='form-control'/>" +
            "<label>Address Line 2</label>" +
            "<input type='text' name='address_line_2_" + beneficiaries + "' placeholder='Address Line 2' required='' class='form-control'/>" +
            "<div class='row'>" +
            "<div class='col-sm-6'>" +
            "<label>Town</label>" +
            "<input type='text' name='town_" + beneficiaries + "' placeholder='Town' required='' class='form-control'/>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label>Postcode</label>" +
            "<input type='text' name='postcode_" + beneficiaries + "' placeholder='Postcode' required='' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        $("#residualEstate").append(beneficiary);
    }
}

function deleteBeneficiary() {

}

function getOrdinalSuffix(number) {
    if (number > 3 && number < 21) {
        return "th";
    } else if (number === 1) {
        return "st";
    } else if (number === 2) {
        return "nd";
    } else if (number === 3) {
        return "rd";
    } else {
        switch (number % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }
}

$(document).ready(() => {
    //Bind Button Events
    $("#addBeneficiary").on("click", addBeneficiary);
    $("#deleteBeneficiary").on("click", deleteBeneficiary);
});