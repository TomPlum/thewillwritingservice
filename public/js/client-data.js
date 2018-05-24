$(document).ready(() => {
    //Populate Fields (Where Possible)
    populateExistingData();

    //Bind Buttons
    $("#next").on("click", () => {
        const form = $("#clientDataForm");
        if (form.valid()) {
            console.log("The Form Is Valid!");

            //Start Animation
            $("#next").html("<i class='fas fa-circle-notch fa-spin fa-fw'></i> Saving...");

            const id = getURLParameter("id");

            $.ajax({
                type: "POST",
                url: "/forms/save-last-will-and-testament-client-data",
                data: {
                    username: $("#personalUsername").val(),
                    email: $("#personalEmail").val(),
                    first_name: $("#personalFirstName").val(),
                    last_name: $("#personalLastName").val(),
                    title: $("#personalTitle").val(),
                    tel_home: $("#personalTelephone").val(),
                    tel_mobile: $("#personalMobile").val(),
                    date_of_birth: $("#personalDob").val(),
                    job_title: $("#personalPosition").val(),
                    nationality: $("#personalNationality").val(),
                    children_current: $("#personalNumberOfChildren").val(),
                    children_previous: $("#personalNumberOfChildrenPrevious").val(),
                    children_minor: $("#personalNumberOfChildrenUnderEighteen").val(),
                    employer: $("#personalEmployer").val(),
                    marital_status: $("#personalMaritalStatus").val(),
                    address_line_one: $("#personalAddressLine1").val(),
                    address_line_two: $("#personalAddressLine2").val(),
                    town: $("#personalTown").val(),
                    postcode: $("#personalPostcode").val(),
                    property_duration: $("#personalPropertyDuration").val(),
                    lastWillAndTestamentId: id
                },
                success: function(data) {
                    if(!data.success) {
                        alert("Form Failed To Save. See Server Console.");
                    } else {
                        window.location.href="/forms/last-will-and-testament-executors?id=" + id;
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        } else {
            console.log("The Form Is Not Valid!");
        }
    });

    //Clear Form
    $("#clearForm").on("click", () => {
        if (confirm("All form data will be cleared. Are you sure?")) {
            clearForm();
        }
    });

    //Add 'My' Data
    $("#getUserData").on("click", () => {
        if (confirm("This will overwrite the entire form with any data we have stored on your profile. Are you sure?")) {
            populateExistingData();
        }
    });
});


function populateExistingData() {
    $.ajax({
        type: "POST",
        url: "/profile/get-personal-information",
        success: function(data) {
            //Populate Fields
            $("#personalFirstName").val(data.first_name);
            $("#personalLastName").val(data.last_name);
            $("#personalTitle").val(data.title);
            $("#personalUsername").val(data.username);
            $("#personalEmail").val(data.email);
            $("#personalTelephone").val(data.tel_home);
            $("#personalMobile").val(data.tel_mobile);
            $("#personalDob").val(data.dob);
            $("#personalNationality").val(data.nationality);
            $("#personalNumberOfChildren").val(data.children_current);
            $("#personalNumberOfChildrenPrevious").val(data.children_previous);
            $("#personalNumberOfChildrenUnderEighteen").val(data.children_minor);
            $("#personalEmployer").val(data.employer);
            $("#personalPosition").val(data.job_title);
            $("#personalMaritalStatus").val(data.marital_status);
            $("#personalAddressLine1").val(data.address_line_1);
            $("#personalAddressLine2").val(data.address_line_2);
            $("#personalTown").val(data.town);
            $("#personalPostcode").val(data.postcode);
            $("#personalPropertyDuration").val(data.property_duration);

            //Validate To Remove Any Left-Over Error Messages
            $("#clientDataForm").validate();
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function clearForm() {
    $("#personalFirstName").val("");
    $("#personalLastName").val("");
    $("#personalTitle").val("");
    $("#personalUsername").val("");
    $("#personalEmail").val("");
    $("#personalTelephone").val("");
    $("#personalMobile").val("");
    $("#personalDob").val("");
    $("#personalNationality").val("");
    $("#personalNumberOfChildren").val("");
    $("#personalNumberOfChildrenPrevious").val("");
    $("#personalNumberOfChildrenUnderEighteen").val("");
    $("#personalEmployer").val("");
    $("#personalPosition").val("");
    $("#personalMaritalStatus").val("");
    $("#personalAddressLine1").val("");
    $("#personalAddressLine2").val("");
    $("#personalTown").val("");
    $("#personalPostcode").val("");
    $("#personalPropertyDuration").val("");
}