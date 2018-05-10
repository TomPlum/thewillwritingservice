let numberOfExecutors = 1;
let numberOfProfessionalExecutors = 1;

function addExecutor() {
    if (numberOfExecutors === 8) {
        alert("You can have a maximum of eight executors.");
    } else {
        numberOfExecutors++;
        console.log("Number of Executors: " + numberOfExecutors);

        const executorForm = "<!-- Spouse to Executor? -->" +
            "               <div class='executor_details_" + numberOfExecutors + "'>" +
            "            <!-- Executor Details - These can be dynamically added via jQuery -->" +
            "            <div class='row'>" +
            "                <div class='col-md-12'>" +
            "                    <h2>Details of  " + numberOfExecutors + "<sup>" + getOrdinalSuffix(numberOfExecutors) + "</sup> Executor</h2>" +
            "                </div>" +
            "            </div>" +
            "            <div class='row executor-details'>" +
            "                <div class='col-md-6'>" +
            "                    <!-- Relationship to 1st & 2nd Testators -->" +
            "                    <div class='row'>" +
            "                        <div class='col-sm-6'>" +
            "                            <label>Relationship to 1 <sup>st</sup> Testator</label>" +
            "                            <input class='form-control' name='relationship_testator_one_" + numberOfExecutors + "' type='text' placeholder='Relationship'/>" +
            "                        </div>" +
            "                        <div class='col-sm-6'>" +
            "                            <label>Relationship to 2 <sup>nd</sup> Testator</label>" +
            "                            <input class='form-control' name='relationship_testator_two_" + numberOfExecutors + "' type='text' placeholder='Relationship'/>" +
            "                        </div>" +
            "                    </div>" +
            "                    <!-- Title, Forename, Surname -->" +
            "                    <div class='row'>" +
            "                        <div class='col-sm-2'>" +
            "                            <label for='title'>Title</label>" +
            "                            <select id='title' class='form-control'>" +
            "                                <option name='title_" + numberOfExecutors + "' value='mr'>Mr</option>" +
            "                                <option name='title_" + numberOfExecutors + "' value='mrs'>Mrs</option>" +
            "                                <option name='title_" + numberOfExecutors + "' value='miss'>Miss</option>" +
            "                                <option name='title_" + numberOfExecutors + "' value='ms'>Ms</option>" +
            "                                <option name='title_" + numberOfExecutors + "' value='dr'>Dr</option>" +
            "                                <option name='title_" + numberOfExecutors + "' value='prof'>Prof</option>" +
            "                                <option name='title_" + numberOfExecutors + "' value='rev'>Rev</option>" +
            "                            </select>" +
            "                        </div>" +
            "                        <div class='col-sm-4'>" +
            "                            <label>Forename</label>" +
            "                            <input type='text' class='form-control' name='first_name_" + numberOfExecutors + "' placeholder='Forename'/>" +
            "                        </div>" +
            "                        <div class='col-sm-6'>" +
            "                            <label>Surname</label>" +
            "                            <input type='text' class='form-control' name='last_name_" + numberOfExecutors + "' placeholder='Surname'/>" +
            "                        </div>" +
            "                    </div>" +
            "                    <!-- Phone Numbers (Mobile & Home) -->" +
            "                    <div class='row'>" +
            "                        <div class='col-sm-6'>" +
            "                            <label>Tel (Mobile)</label>" +
            "                            <input type='text' class='form-control' name='tel_mobile_" + numberOfExecutors + "' placeholder='Mobile Telephone'/>" +
            "                        </div>" +
            "                        <div class='col-sm-6'>" +
            "                            <label>Tel (Home)</label>" +
            "                            <input type='text' class='form-control' name='tel_home_" + numberOfExecutors + "' placeholder='Home Telephone'/>" +
            "                        </div>" +
            "                    </div>" +
            "" +
            "                    <div class='row'>" +
            "                        <div class='col-md-12'>" +
            "                            <label>Sole, Joint or Alternative?</label>" +
            "                        </div>" +
            "                    </div>" +
            "                    <div class='row'>" +
            "                        <div class='col-sm-3'>" +
            "                            <div class='radio'>" +
            "                                <label><input type='radio' name='sole_joint_alternative_" + numberOfExecutors + "' value='sole'/> Sole </label>" +
            "                            </div>" +
            "                        </div>" +
            "                        <div class='col-sm-3'>" +
            "                            <div class='radio'>" +
            "                                <label><input type='radio' name='sole_joint_alternative_" + numberOfExecutors + "' value='joint'/> Joint </label>" +
            "                            </div>" +
            "                        </div>" +
            "                        <div class='col-sm-3'>" +
            "                            <div class='radio'>" +
            "                                <label><input type='radio' name='sole_joint_alternative_" + numberOfExecutors + "' value='alternative'/> Alternative </label>" +
            "                            </div>" +
            "                        </div>" +
            "                    </div>" +
            "                </div>" +
            "                <div class='col-md-6'>" +
            "                    <label>Address Line 1</label>" +
            "                    <input type='text' class='form-control' name='address_line_1_" + numberOfExecutors + "' placeholder='Address Line 1'/>" +
            "" +
            "                    <label>Address Line 2</label>" +
            "                    <input type='text' class='form-control' name='address_line_2_" + numberOfExecutors + "' placeholder='Address Line 2'/>" +
            "" +
            "                    <div class='row'>" +
            "                        <div class='col-sm-6'>" +
            "                            <label>Town</label>" +
            "                            <input type='text' class='form-control' name='town_" + numberOfExecutors + "' placeholder='Town'/>" +
            "                        </div>" +
            "                        <div class='col-sm-6'>" +
            "                            <label>Postcode</label>" +
            "                            <input type='text' class='form-control' name='postcode_" + numberOfExecutors + "' placeholder='Postcode'/>" +
            "                        </div>" +
            "                    </div>" +
            "                </div>" +
            "            </div>" +
            "            <hr>" +
            "        </div>" +
            "      </div>";
        $("#executors").append(executorForm);
    }
}

function deleteExecutor() {
    if (numberOfExecutors === 1) {
        alert("You must have at least one executor.");
    } else {
        if (confirm("Are you sure you want to delete this executor?")) {
            $(".executor_details_" + numberOfExecutors).remove();
            numberOfExecutors--;
        }
    }
}

function addProfessionalExecutor() {
    if (numberOfProfessionalExecutors === 4) {
        alert("You can add a maximum of four professional executors.");
    } else {
        numberOfProfessionalExecutors++;
        let prof_execs = $("#professional_executors");

        let prof_exec_form = "<div class='professional_executor_details_" + numberOfProfessionalExecutors + "'>" +
            "                    <!-- Professional Executor Details Title (Dynamic) -->" +
            "                    <div class='col-md-6'>" +
            "                        <h2>" + numberOfProfessionalExecutors + "<sup>" + getOrdinalSuffix(numberOfProfessionalExecutors) + "</sup> Professional Executor</h2>" +
            "                        <div class='row'>" +
            "                            <div class='col-sm-6'>" +
            "                                <!-- Firm Name -->" +
            "                                <label>Firm Name</label>" +
            "                                <input type='text' name='firm_name_" + numberOfProfessionalExecutors + "' class='form-control' placeholder='Firm Name'/>" +
            "                            </div>" +
            "                            <div class='col-sm-6'>" +
            "                                <!-- Telephone Name -->" +
            "                                <label>Business Number</label>" +
            "                                <input type='text' name='business_number_" + numberOfProfessionalExecutors + "' class='form-control' placeholder='Phone Number'/>" +
            "                            </div>" +
            "                        </div>" +
            "                        <!-- Address -->" +
            "                        <label>Address Line 1</label>" +
            "                        <input type='text' class='form-control' name='prof_address_line_1_" + numberOfProfessionalExecutors + "' placeholder='Address Line 1'/>" +
            "                        <label>Address Line 2</label>" +
            "                        <input type='text' class='form-control' name='prof_address_line_2_" + numberOfProfessionalExecutors + "' placeholder='Address Line 2'/>" +
            "                        <div class='row'>" +
            "                            <div class='col-sm-6'>" +
            "                                <label>Town</label>" +
            "                                <input type='text' class='form-control' name='prof_town_" + numberOfProfessionalExecutors + "' placeholder='Town'/>" +
            "                            </div>" +
            "                            <div class='col-sm-6'>" +
            "                                <label>Postcode</label>" +
            "                                <input type='text' class='form-control' name='prof_postcode_" + numberOfProfessionalExecutors + "' placeholder='Postcode'/>" +
            "                            </div>" +
            "                        </div>" +
            "                        <!-- Sole, Joint or Alternative? -->" +
            "                        <div class='row'>" +
            "                            <div class='col-md-12'>" +
            "                                <label>Sole, Joint or Alternative?</label>" +
            "                            </div>" +
            "                        </div>" +
            "                        <div class='row'>" +
            "                            <div class='col-sm-3'>" +
            "                                <div class='radio'>" +
            "                                    <label><input checked type='radio' name='prof_sole_joint_alternative_" + numberOfProfessionalExecutors + "' value='sole'/> Sole </label>" +
            "                                </div>" +
            "                            </div>" +
            "                            <div class='col-sm-3'>" +
            "                                <div class='radio'>" +
            "                                    <label><input type='radio' name='prof_sole_joint_alternative_" + numberOfProfessionalExecutors + "' value='joint'/> Joint </label>" +
            "                                </div>" +
            "                            </div>" +
            "                            <div class='col-sm-3'>" +
            "                                <div class='radio'>" +
            "                                    <label><input type='radio' name='prof_sole_joint_alternative_" + numberOfProfessionalExecutors + "' value='alternative'/> Alternative </label>" +
            "                                </div>" +
            "                            </div>" +
            "                        </div>" +
            "                    </div>" +
            "                </div>";

        prof_execs.append(prof_exec_form);
    }
}

function deleteProfessionalExecutor() {
    if (numberOfProfessionalExecutors === 1) {
        alert("You must have atleast one professional executor.\nIf you wish to remove all, please check 'No' for 'TWP to Act?'.");
    } else {
        if (confirm("Are you sure you want to delete this professional executor?")) {
            $(".professional_executor_details_" + numberOfProfessionalExecutors).remove();
            numberOfProfessionalExecutors--;
        }
    }
}

function addTestData() {
    //Executor 1
    $("input[name='relationship_testator_one_1']").val("Father");
    $("input[name='relationship_testator_two_1']").val("Mother");
    $("input[name='first_name_1']").val("Thomas");
    $("input[name='last_name_1']").val("Plumpton");
    $("input[name='tel_mobile_1']").val("07736958320");
    $("input[name='tel_home_1']").val("01706 352567");
    $("input[name='address_line_1_1']").val("20 Murrayfield");
    $("input[name='address_line_2_1']").val("Bamford");
    $("input[name='town_1']").val("Rochdale");
    $("input[name='postcode_1']").val("OL11 5UQ");

    //Professional Executor 1
    $("input[name='firm_name_1']").val("Biodata Ltd.");
    $("input[name='business_number_1']").val("0835678345");
    $("input[name='prof_address_line_1_1']").val("10 Stocks Street");
    $("input[name='prof_address_line_2_1']").val("Cheetham Hill");
    $("input[name='prof_town_1']").val("Greater Manchester");
    $("input[name='prof_postcode_1']").val("M8 7RH");
    $("input[name='prof_sole_joint_alternative_1']").prop("checked", true);

    if (numberOfExecutors === 2) {
        $("input[name='relationship_testator_one_2']").val("Sister");
        $("input[name='relationship_testator_two_2']").val("Brother");
        $("input[name='first_name_2']").val("Louis");
        $("input[name='last_name_2']").val("Smith");
        $("input[name='tel_mobile_2']").val("07569562358");
        $("input[name='tel_home_2']").val("01706 654987");
        $("input[name='address_line_1_2']").val("18 Porrit Close");
        $("input[name='address_line_2_2']").val("Norden");
        $("input[name='town_2']").val("Rochdale");
        $("input[name='postcode_2']").val("OL14 8ID");
    }

    if (numberOfProfessionalExecutors === 2) {
        $("input[name='firm_name_2']").val("SportSpecific Ltd");
        $("input[name='business_number_2']").val("030032312312");
        $("input[name='prof_address_line_1_2']").val("15 Manchester Street");
        $("input[name='prof_address_line_2_2']").val("Hartford");
        $("input[name='prof_town_2']").val("Nortwich");
        $("input[name='prof_postcode_2']").val("M9 7KJ");
        $("input[name='prof_sole_joint_alternative_2']").prop("checked", false);
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

$(document).ready(() => {
    //Spouse to Executors
    $("input[name='spouse_to_executor']").on("change", () => {
        let val = $("input[name='spouse_to_executor']:checked").val();
        let sole_or_joint = $("#sole_or_joint");
        if (val === "yes") {
            sole_or_joint.addClass("in");
        } else {
            sole_or_joint.removeClass("in");
        }
    });

    //TWP to Act?
    $("input[name='twp_to_act']").on("change", () => {
        let val = $("input[name='twp_to_act']:checked").val();
        $("#prof_exec_controls, .professional_executor_details_1");
    });

    //Bind Button Events
    $("#addExecutor").on("click", addExecutor);
    $("#deleteExecutor").on("click", deleteExecutor);
    $("#addProfessionalExecutor").on("click", addProfessionalExecutor);
    $("#deleteProfessionalExecutor").on("click", deleteProfessionalExecutor);
    $("#addTestData").on("click", addTestData);

    //Bind Submit (Next)
    $("#next").on("click", () => {
        //Start Animation
        $("#next").html("<i class='fas fa-circle-notch fa-spin fa-fw'></i> Saving...");

        let executors = [];
        let professionalExecutors = [];

        for (let i = 1; i <= numberOfExecutors; i++) {
            executors.push({
                testator_one_relationship: $("input[name='relationship_testator_one_" + i + "']").val(),
                testator_two_relationship: $("input[name='relationship_testator_two_" + i + "']").val(),
                title: $("option[name='title_" + i + "']:selected").val(),
                first_name: $("input[name='first_name_" + i + "']").val(),
                last_name: $("input[name='last_name_" + i + "']").val(),
                tel_mobile: $("input[name='tel_mobile_" + i + "']").val(),
                tel_home: $("input[name='tel_home_" + i + "']").val(),
                type: $("input[name='sole_joint_alternative_" + i + "']:checked").val(),
                address_line_one: $("input[name='address_line_1_" + i + "']").val(),
                address_line_two: $("input[name='address_line_2_" + i + "']").val(),
                town: $("input[name='town_" + i + "']").val(),
                postcode: $("input[name='postcode_" + i + "']").val()
            });
        }

        for (let i = 1; i <= numberOfProfessionalExecutors; i++) {
            professionalExecutors.push({
                firm_name: $("input[name='firm_name_" + i + "']").val(),
                phone: $("input[name='business_number_" + i + "']").val(),
                address_line_one: $("input[name='prof_address_line_1_" + i + "']").val(),
                address_line_two: $("input[name='prof_address_line_2_" + i + "']").val(),
                town: $("input[name='prof_town_" + i + "']").val(),
                postcode: $("input[name='prof_postcode_" + i + "']").val(),
                type: $("input[name='prof_sole_joint_alternative_" + i + "']:checked").val(),
            });
        }

        $.ajax({
            url: "/forms/save-last-will-and-testament-executors",
            type: "POST",
            data: {
                spouse_to_the_executor: $("input[name='spouse_to_executor']:checked").val(),
                sole_or_joint: $("input[name='sole_or_joint']:checked").val(),
                twp_to_act: $("input[name='twp_to_act']:checked").val(),
                mirror_executor: $("input[name='mirror_executor']:checked").val(),
                executors: executors,
                professionalExecutors: professionalExecutors
            },
            success: function(res) {
                if (res.success) {
                    window.location.href="/forms/last-will-and-testament-residual-estate";
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