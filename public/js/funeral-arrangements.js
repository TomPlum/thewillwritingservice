let numberOfTestators = 1;

function addTestatorTwo() {
    let testatorTwo = "<h3><i class='fas fa-fw fa-user'></i> Testator Two</h3>" +
        "<hr>" +
        "  <!--Funeral Pre-Arranged With-->" +
        "  <label>Funeral Pre-Arranged With</label>" +
        "  <input type='text' name='testator_two_pre_arrange' placeholder='Who has it been pre-arranged with?' class='form-control'/>" +
        "  <!--Funeral Reference Number-->" +
        "  <label>Funeral Reference Number</label>" +
        "  <input type='text' name='testator_two_funeral_ref' placeholder='Ref No.' class='form-control'/>" +
        "  <!--How Will It Be Funded?-->" +
        "  <label>How will it be funded?</label>" +
        "  <input type='text' name='testator_two_how_funded' placeholder='Funding Method' class='form-control'/>" +
        "  <!--Donation of Body to Research?-->" +
        "  <label>Donation of Body for Research?</label>" +
        "  <div class='row'>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input checked='' type='radio' name='testator_two_body_donation' value='true'/> Yes" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input type='radio' name='testator_two_body_donation' value='false'/> No" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <!--Donation of Organs for Transplant?-->" +
        "  <label>Donation of organs for transplant?</label>" +
        "  <div class='row'>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input checked='' type='radio' name='testator_two_organ_donation' value='true'/> Yes" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input type='radio' name='testator_two_organ_donation' value='false'/> No" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <!--Any organs not be used?-->" +
        "  <label>Any organs not to be used?</label>" +
        "  <input type='text' name='testator_two_excluded_organs' placeholder='Organs to Exclude' class='form-control'/>" +
        "  <!--Cremation Required?-->" +
        "  <label>Cremation Required?</label>" +
        "  <div class='row'>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input checked='' type='radio' name='testator_two_cremation_required' value='true'/> Yes" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input type='radio' name='testator_two_cremation_required' value='false'/> No" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <!--Burial Required?-->" +
        "  <label>Burial Required?</label>" +
        "  <div class='row'>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input checked='' type='radio' name='testator_two_burial_required' value='true'/> Yes" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input type='radio' name='testator_two_burial_required' value='false'/> No" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <!--Service to take place at-->" +
        "  <label>Service to take place at</label>" +
        "  <textarea name='testator_two_service_place' placeholder='Location/Address' class='form-control'></textarea>" +
        "  <!--Burial/Cremation to take place at-->" +
        "  <label>Burial / Cremation to take place at</label>" +
        "  <textarea name='testator_two_burial_place' placeholder='Location/Address' class='form-control'></textarea>" +
        "  <!--Ashes buried or scattered?-->" +
        "  <label>Ashes to be buried or scattered?</label>" +
        "  <div class='row'>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input checked='' type='radio' name='testator_two_buried_scattered' value='buried'/> Buried" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input type='radio' name='testator_two_buried_scattered' value='scattered'/> Scattered" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <!--Where will the ashes be scattered or buried?-->" +
        "  <label>Where will the ashes be buried / scattered?</label>" +
        "  <textarea name='testator_two_buried_scattered_place' placeholder='Location/Address' class='form-control'></textarea>" +
        "  <!--Service Requirements-->" +
        "  <label>Service Requirements (Songs / Religious Traditions / Clothing / Tone of Service)</label>" +
        "  <textarea name='testator_two_service_requirements' placeholder='Service Requirements' class='form-control'></textarea>" +
        "  <!--Family Flowers Only?-->" +
        "  <label>Family Flowers Only?</label>" +
        "  <div class='row'>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input checked='' type='radio' name='testator_two_family_flowers' value='true'/> Yes" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "    <div class='col-xs-6'>" +
        "      <div class='radio'>" +
        "        <label>" +
        "          <input type='radio' name='testator_two_family_flowers' value='false'/> No" +
        "        </label>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <!--Donation of flowers in lieu-->" +
        "  <label>Donation of flowers in lieu to</label>" +
        "  <input type='text' name='testator_two_donation_flowers' placeholder='Full Name' class='form-control'/>" +
        "  <!--Service Requirements-->" +
        "  <label>Notes</label>" +
        "  <textarea name='testator_two_notes' placeholder='Additional Information' class='form-control'></textarea>";

    //Add Form
    let container = $("#testatorTwoContainer");
    container.html(testatorTwo);

    //Add Copy & Remove Buttons
    container.append("<button id='removeTestatorTwo' type='button' class='btn btn-lg btn-danger'><i class='fas fa-fw fa-times'></i> Remove Testator Two</button>");
    $("#removeTestatorTwo").on("click", removeTestatorTwo);

    container.append("<button id='copyTestatorTwo' type='button' class='btn btn-lg btn-info'><i class='fas fa-fw fa-copy'></i>Copy Testator One</button>");
    $("#copyTestatorTwo").on("click", copyTestatorOneData);

    //Increment Counter
    numberOfTestators++;
}

function removeTestatorTwo() {
    if (confirm("Are you sure you want to remove Testator Two? You will lose all of their details.")) {
        let original = "<h3><i class='fas fa-fw fa-user'></i> Testator Two</h3><hr>" +
            "  <p>If you would like to add a second testator's details to the funeral arrangements, you can use the options below.</p>" +
            "  <button id='addBlankTestator' type='button' class='btn btn-lg btn-primary'><i class='fas fa-fw fa-file'></i> Add Blank</button>" +
            "  <button id='addMirroredTestator' type='button' class='btn btn-lg btn-info'><i class='fas fa-fw fa-copy'></i> Copy Testator One</button>";
        $("#testatorTwoContainer").html(original);

        //Bind Buttons
        $("#addBlankTestator").on("click", addTestatorTwo);
        $("#addMirroredTestator").on("click", () => {
            addTestatorTwo();
            copyTestatorOneData();
        });

        //Decrement Counter
        numberOfTestators--;
    }
}

function addTestData() {
    $("input[name='testator_one_pre_arrange']").val("East London Funeral Services");
    $("input[name='testator_one_funeral_ref']").val("FREF361651321");
    $("input[name='testator_one_how_funded']").val("Debit Card (Paid in Advance)");
    $("input[name='testator_one_body_donation']").prop("checked", true);
    $("input[name='testator_one_organ_donation']").prop("checked", true);
    $("input[name='testator_one_excluded_organs']").val("N/A");
    $("input[name='testator_one_cremation_required']").prop("checked", false);
    $("input[name='testator_one_burial_required']").prop("checked", true);
    $("textarea[name='testator_one_service_place']").val("788 London Rd, Larkfield, Aylesford‎");
    $("textarea[name='testator_one_burial_place']").val("Cemetery Road. Forest Gate. E7 9DG");
    $("input[name='testator_one_buried_scattered']").prop("checked", true);
    $("textarea[name='testator_one_buried_scattered_place']").val("In the ground");
    $("textarea[name='testator_one_service_requirements']").val("Play some sad music pls");
    $("input[name='testator_one_family_flowers']").prop("checked", true);
    $("input[name='testator_one_donation_flowers']").val("Tracey Rainsford");
    $("textarea[name='testator_one_notes']").val("Rest in peace.");
}

function copyTestatorOneData() {
    $("input[name='testator_two_pre_arrange']").val($("input[name='testator_one_pre_arrange']").val());
    $("input[name='testator_two_funeral_ref']").val($("input[name='testator_one_funeral_ref']").val());
    $("input[name='testator_two_how_funded']").val($("input[name='testator_one_how_funded']").val());
    $("input[name='testator_two_body_donation']").val();
    $("input[name='testator_two_organ_donation']").val();
    $("input[name='testator_two_excluded_organs']").val();
    $("input[name='testator_two_cremation_required']").val();
    $("input[name='testator_two_burial_required']").val();
    $("textarea[name='testator_two_service_place']").val();
    $("textarea[name='testator_one_burial_place']").val();
    $("input[name='testator_two_buried_scattered']").val();
    $("textarea[name='testator_two_buried_scattered_place']").val();
    $("textarea[name='testator_two_service_requirements']").val();
    $("input[name='testator_two_family_flowers']").val();
    $("input[name='testator_two_donation_flowers']").val();
    $("textarea[name='testator_two_notes']").val();
}

$(document).ready(() => {
    //Bind Buttons
    $("#addBlankTestator").on("click", addTestatorTwo);
    $("#addMirroredTestator").on("click", () => {
       addTestatorTwo();
       copyTestatorOneData();
    });
    $("#addTestData").on("click", addTestData);

    $("#next").on("click", () => {
        let testatorOne = {
            pre_arrange: $("input[name='testator_one_pre_arrange']").val(),
            funeral_ref: $("input[name='testator_one_funeral_ref']").val(),
            how_funded:  $("input[name='testator_one_how_funded']").val(),
            body_donation: $("input[name='testator_one_body_donation']:checked").val(),
            organ_donation: $("input[name='testator_one_organ_donation']:checked").val(),
            excluded_organs: $("input[name='testator_one_excluded_organs']").val(),
            cremation_required: $("input[name='testator_one_cremation_required']:checked").val(),
            burial_required: $("input[name='testator_one_burial_required']:checked").val(),
            service_place: sanitiseLefToRightMark($("textarea[name='testator_one_service_place']").val()),
            burial_place:  $("textarea[name='testator_one_burial_place']").val(),
            buried_scattered: $("input[name='testator_one_buried_scattered']:checked").val(),
            buried_scattered_place: $("textarea[name='testator_one_buried_scattered_place']").val(),
            service_requirements: $("textarea[name='testator_one_service_requirements']").val(),
            family_flowers: $("input[name='testator_one_family_flowers']").val(),
            donation_flowers: $("input[name='testator_one_donation_flowers']").val(),
            notes: $("textarea[name='testator_one_notes']").val()
        };

        let testatorTwo = null;
        if (numberOfTestators === 2) {
            testatorTwo = {
                pre_arrange: $("input[name='testator_two_pre_arrange']").val(),
                funeral_ref: $("input[name='testator_two_funeral_ref']").val(),
                how_funded:  $("input[name='testator_two_how_funded']").val(),
                body_donation: $("input[name='testator_two_body_donation']:checked").val(),
                organ_donation: $("input[name='testator_two_organ_donation']:checked").val(),
                excluded_organs: $("input[name='testator_two_excluded_organs']").val(),
                cremation_required: $("input[name='testator_two_cremation_required']:checked").val(),
                burial_required: $("input[name='testator_two_burial_required']:checked").val(),
                service_place: $("textarea[name='testator_two_service_place']").val(),
                burial_place:  $("textarea[name='testator_two_burial_place']").val(),
                buried_scattered: $("input[name='testator_two_buried_scattered']:checked").val(),
                buried_scattered_place: $("textarea[name='testator_two_buried_scattered_place']").val(),
                service_requirements: $("textarea[name='testator_two_service_requirements']").val(),
                family_flowers: $("input[name='testator_two_family_flowers']").val(),
                donation_flowers: $("input[name='testator_two_donation_flowers']").val(),
                notes: $("textarea[name='testator_two_notes']").val()
            };
        }

        const lastWillAndTestamentId = getURLParameter("id");
        
        $.ajax({
            type: "POST",
            url: "/forms/save-last-will-and-testament-funeral-arrangements",
            data: {testatorOne: testatorOne, testatorTwo: testatorTwo, lastWillAndTestamentId: lastWillAndTestamentId},
            success: function(data) {
                window.location.href = "/forms/payment?id=" + lastWillAndTestamentId
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});