let beneficiaries = 1;
let reserves = 0;
let exclusions = 0;

function addBeneficiary() {
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
    if (beneficiaries === 1) {
        alert("You must have at least one beneficiary")
    } else {
        if (confirm("Are you sure you want to remove this beneficiary? Their details will be lost.")) {
            $("#beneficiary_" + beneficiaries).remove();
            beneficiaries--;
        }
    }
}

function addReserveBeneficiary() {
    if (reserves === 4) {
        alert("You can only add a maximum of four reserve beneficiaries.");
    } else {
        reserves++;
        let reserveBeneficiary = "<div id='reserve_beneficiary_" + reserves + "'>" +
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<h2>Details of " + reserves + "<sup>" + getOrdinalSuffix(reserves) + "</sup> Reserve Beneficiary</h2>" +
            "</div>" +
            "</div>" +
            "<div class='row reserve-beneficiary-details'>" +
            "<div class='col-md-6'>" +
            "<!-- Relationship to 1st & 2nd Testators-->" +
            "<div class='row'>" +
            "<div class='col-sm-6'>" +
            "<label>Relationship to 1<sup>st</sup> Testator</label>" +
            "<input name='reserve_relationship_testator_one_" + reserves + "' type='text' placeholder='Relationship' class='form-control'/>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label>Relationship to 2<sup>nd</sup> Testator</label>" +
            "<input name='reserve_relationship_testator_two_" + reserves + "' type='text' placeholder='Relationship' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "<!-- Title, Forename, Surname-->" +
            "<div class='row'>" +
            "<div class='col-sm-2'>" +
            "<label for='reserve_title'>Title</label>" +
            "<select id='reserve_title' class='form-control'>" +
            "<option name='reserve_title_" + reserves + "' value='mr'>Mr</option>" +
            "<option name='reserve_title_" + reserves + "' value='mrs'>Mrs</option>" +
            "<option name='reserve_title_" + reserves + "' value='miss'>Miss</option>" +
            "<option name='reserve_title_" + reserves + "' value='ms'>Ms</option>" +
            "</select>" +
            "</div>" +
            "<div class='col-sm-4'>" +
            "<label>Forename</label>" +
            "<input type='text' name='reserve_first_name_" + reserves + "' placeholder='Forename' required='' class='form-control'/>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label>Surname</label>" +
            "<input type='text' name='reserve_last_name_" + reserves + "' placeholder='Surname' required='' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "<!-- Phone Numbers (Mobile & Home)-->" +
            "<div class='row'>" +
            "<div class='col-sm-6'>" +
            "<label>Tel (Mobile)</label>" +
            "<input type='text' name='reserve_tel_mobile_" + reserves + "' placeholder='Mobile Telephone' class='form-control'/>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label>Tel (Home)</label>" +
            "<input type='text' name='reserve_tel_home_" + reserves + "' placeholder='Home Telephone' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "<!--Share to Beneficiary?-->" +
            "<div class='row'>" +
            "<div class='col-xs-6'>" +
            "<label>Share to Beneficiary?</label>" +
            "<input type='text' name='reserve_share_to_beneficiary_" + reserves + "' placeholder='Percentage' class='form-control'/>" +
            "</div>" +
            "<div class='col-xs-6'>" +
            "<label>At Age</label>" +
            "<input type='text' name='reserve_share_age_" + reserves + "' placeholder='Age' class='form-control'/>" +
            "</div>" +
            "<div class='col-xs-6'>" +
            "<label>Or to Issue?</label>" +
            "<div class='row'>" +
            "<div class='col-xs-6'>" +
            "<div class='radio'>" +
            "<label>" +
            "<input checked='' type='radio' name='reserve_to_issue_" + reserves + "' value='true'/> Yes" +
            "</label>" +
            "</div>" +
            "</div>" +
            "<div class='col-xs-6'>" +
            "<div class='radio'>" +
            "<label>" +
            "<input type='radio' name='reserve_to_issue_" + reserves + "' value='false'/> No" +
            "</label>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='col-xs-6'>" +
            "<label>At Age</label>" +
            "<input type='text' name='reserve_to_issue_age_" + reserves + "' placeholder='Age' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<!-- Address-->" +
            "<div class='col-md-6'>" +
            "<label>Address Line 1</label>" +
            "<input type='text' name='reserve_address_line_1_" + reserves + "' placeholder='Address Line 1' required='' class='form-control'/>" +
            "<label>Address Line 2</label>" +
            "<input type='text' name='reserve_address_line_2_" + reserves + "' placeholder='Address Line 2' required='' class='form-control'/>" +
            "<div class='row'>" +
            "<div class='col-sm-6'>" +
            "<label>Town</label>" +
            "<input type='text' name='reserve_town_" + reserves + "' placeholder='Town' required='' class='form-control'/>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label>Postcode</label>" +
            "<input type='text' name='reserve_postcode_" + reserves + "' placeholder='Postcode' required='' class='form-control'/>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<hr><br>" +
            "</div>";
        
        $("#reserveContainer").append(reserveBeneficiary);
    }
}

function deleteReserveBeneficiary() {
    if (reserves > 0 && confirm("Are you sure you want to delete this reserve beneficiary? Their details will be lost.")) {
        $("#reserve_beneficiary_" + reserves).remove();
        reserves--;
    }
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

function addTestData() {
    //Beneficiary One
    $("input[name='relationship_testator_one_1']").val("Daughter");
    $("input[name='relationship_testator_two_1']").val("Auntie");
    $("input[name='first_name_1']").val("Gareth");
    $("input[name='last_name_1']").val("Weston");
    $("input[name='tel_mobile_1']").val("07754895623");
    $("input[name='tel_home_1']").val("01706 321987");
    $("input[name='address_line_1_1']").val("25 Beech Close");
    $("input[name='address_line_2_1']").val("Heywood");
    $("input[name='town_1']").val("Rochdale");
    $("input[name='postcode_1']").val("OL12 6GQ");
    $("input[name='share_to_beneficiary_1']").val("65");
    $("input[name='share_age_1']").val("21");
    $("input[name='to_issue_age_1']").val("18");
}

function addExclusion() {
    if (exclusions === 8) {
        alert("You cannot exclude more than eight people from your will.");
    } else {
        exclusions++;
        let field = "<div class='col-sm-6' id='exclusion_row_" + exclusions + "'><input class='form-control' type='text' placeholder='Full Name' name='will_exclusion_" + exclusions + "'/></div>";
        $("#willExclusionContainer").append(field);
    }
}

function deleteExclusion() {
    if (exclusions > 0 && confirm("Are you sure you want to remove this person?")) {
        $("#exclusion_row_" + exclusions).remove();
        exclusions--;
    }
}

$(document).ready(() => {
    //Bind Button Events
    $("#addBeneficiary").on("click", addBeneficiary);
    $("#deleteBeneficiary").on("click", deleteBeneficiary);
    $("#addReserveBeneficiary").on("click", addReserveBeneficiary);
    $("#deleteReserveBeneficiary").on("click", deleteReserveBeneficiary);
    $("#addExclusion").on("click", addExclusion);
    $("#deleteExclusion").on("click", deleteExclusion);
    $("#addTestData").on("click", addTestData);

    //Bind Submit (Next)
    $("#next").on("click", () => {
        //Start Animation
        $("#next").html("<i class='fas fa-circle-notch fa-spin fa-fw'></i> Saving...");

        let beneficiariesArray = [];
        let reserveBeneficiariesArray = [];
        let exclusionsArray = [];

        for (let i = 1; i <= beneficiaries; i++) {
            beneficiariesArray.push({
                testator_one_relationship: $("input[name='relationship_testator_one_" + i + "']").val(),
                testator_two_relationship: $("input[name='relationship_testator_two_" + i + "']").val(),
                title: $("option[name='title_" + i + "']:selected").val(),
                first_name: $("input[name='first_name_" + i + "']").val(),
                last_name: $("input[name='last_name_" + i + "']").val(),
                tel_mobile: $("input[name='tel_mobile_" + i + "']").val(),
                tel_home: $("input[name='tel_home_" + i + "']").val(),
                address_line_one: $("input[name='address_line_1_" + i + "']").val(),
                address_line_two: $("input[name='address_line_2_" + i + "']").val(),
                town: $("input[name='town_" + i + "']").val(),
                postcode: $("input[name='postcode_" + i + "']").val(),
                share_to_beneficiary: $("input[name='share_to_beneficiary_" + i + "']").val(),
                share_age: $("input[name='share_age_" + i + "']").val(),
                issue: $("input[name='to_issue_" + i + "']").val(),
                issue_age: $("input[name='to_issue_age_" + i + "']").val()
            });
        }

        for (let i = 1; i <= reserves; i++) {
            reserveBeneficiariesArray.push({
                testator_one_relationship: $("input[name='reserve_relationship_testator_one_" + i + "']").val(),
                testator_two_relationship: $("input[name='reserve_relationship_testator_two_" + i + "']").val(),
                title: $("option[name='reserve_title_" + i + "']:selected").val(),
                first_name: $("input[name='reserve_first_name_" + i + "']").val(),
                last_name: $("input[name='reserve_last_name_" + i + "']").val(),
                tel_mobile: $("input[name='reserve_tel_mobile_" + i + "']").val(),
                tel_home: $("input[name='reserve_tel_home_" + i + "']").val(),
                address_line_one: $("input[name='reserve_address_line_1_" + i + "']").val(),
                address_line_two: $("input[name='reserve_address_line_2_" + i + "']").val(),
                town: $("input[name='reserve_town_" + i + "']").val(),
                postcode: $("input[name='reserve_postcode_" + i + "']").val(),
                share_to_beneficiary: $("input[name='reserve_share_to_beneficiary_" + i + "']").val(),
                share_age: $("input[name='reserve_share_age_" + i + "']").val(),
                issue: $("input[name='reserve_to_issue_" + i + "']").val(),
                issue_age: $("input[name='reserve_to_issue_age_" + i + "']").val()
            });
        }

        for (let i = 0; i < exclusions; i++) {
            exclusionsArray.push($("input[name='will_exclusion_" + i + "']")).val();
        }

        const lastWillAndTestamentId = getURLParameter("id");

        $.ajax({
            url: "/forms/save-last-will-and-testament-residual-estate",
            type: "POST",
            data: {
                notes: $("input[name='notes']:checked").val(),
                pass_to_spouse: $("input[name='pass_to_spouse']:checked").val(),
                distribute_residue: $("input[name='distribute_residue']:checked").val(),
                gift_fail: $("input[name='gift_fail']:checked").val(),
                excluded_from_will: exclusionsArray ? exclusionsArray : null,
                beneficiaries: beneficiariesArray,
                reserveBeneficiaries: reserveBeneficiariesArray,
                lastWillAndTestamentId: lastWillAndTestamentId
            },
            success: function(res) {
                if (res.success) {
                    window.location.replace("/forms/last-will-and-testament-funeral-arrangements?id=" + res.lastWillAndTestamentId);
                } else {
                    alert("Error Saving Form.");
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});