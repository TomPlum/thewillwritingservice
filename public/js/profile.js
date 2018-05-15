function renderLastWillAndTestamentTable() {
    $.ajax({
        type: "POST",
        url: "/profile/get-wills",
        success: function(data) {
            console.log(data);
            const oTable = "<table class='table table-hover table-striped table-condensed'>";
            const cTable = "</table>";
            let tBody = "<tbody>";

            let headers = "<thead>" +
                                "<tr>" +
                                    "<th>Will ID</th>" +
                                    "<th>Date Created</th>" +
                                    "<th>Progress</th>"+
                                    "<th>Completed?</th>" +
                                    "<th>Paid</th>" +
                                    "<th>Action</th>"+
                                "</tr>" +
                            "</thead>";

            for (let i = 0; i < data.length; i++) {
                tBody += "<tr>";
                tBody += "<td>" + data[i].lwat_id + "</td>";
                tBody += "<td>" + formatDate(data[i].date) + "</td>";
                if (data[i].completed === 1) {
                    tBody += "<td><i class='fas fa-fw fa-check-circle'></i> Completed</td>";
                } else {
                    tBody += "<td>" + formatProgress(data[i].progress) + "</td>";
                }
                tBody += "<td>" + (data[i].completed === 1 ? "Yes" : "No") + "</td>";
                if (data[i].completed) {
                    tBody += "<td>£20.00</td>";
                } else {
                    tBody += "<td>£0.00</td>";
                }

                if (data[i].completed === 1) {
                    tBody += "<td><a id='viewPdf' href='/forms/view-pdf' target='_blank'><i class='fas fa-fw fa-file-pdf'></i> View PDF </a> &nbsp;&#124;&nbsp; <a id='editWill' href=''><i class='fas fa-fw fa-edit'></i> Edit</a></td>";
                } else {
                    tBody += "<td><i title='Continue your will' class='fas fa-fw fa-check fa-lg continue-will' onclick='continueWillProgression(" + data[i].lwat_id + "," + data[i].progress + ")'></i> or <i title='Delete your will in its current state' onclick='deleteWillInProgress(" + data[i].lwat_id + ")' class='fas fa-fw fa-times fa-lg delete-will'></i></td>";
                }

                tBody += "</tr>";
            }
            tBody += "</tbody>";
            $("#lastWillAndTestamentTable").html(oTable + headers + tBody + cTable);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function renderPersonalInformation() {
    $.ajax({
        type: "POST",
        url: "/profile/get-personal-information",
        success: function(data) {
            console.log(data);
            $("#personalFirstName").val(data.first_name);
            $("#personalLastName").val(data.last_name);
            $("#personalTitle").val(data.title);
            $("#personalUsername").val(data.username);
            $("#personalEmail").val(data.email);
            $("#personalTelephone").val(data.tel_home);
            $("#personalMobile").val(data.tel_mobile);
            $("#personalDob").val(data.dob);
            $("#personalNationality").val(data.nationality);
            $("#personalEmployer").val(data.employer);
            $("#personalPosition").val(data.job_title);
            $("#personalMaritalStatus").val(data.marital_status);
            $("#personalAddressLine1").val(data.address_line_1);
            $("#personalAddressLine2").val(data.address_line_2);
            $("#personalTown").val(data.town);
            $("#personalPostcode").val(data.postcode);
            $("#personalPropertyDuration").val(data.property_duration);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function formatProgress(stage) {
    const stages = ["Appointment of Executors", "Residual Estate", "Funeral Arrangements", "Awaiting Payment"];
    return "Stage " + stage + "/4 - " + stages[stage-1];
}

function updatePersonalInformation() {
    $("#updatePersonalInformation").html("<i class='fas fa-fw fa-spin fa-circle-notch'></i> Updating...");

    $.ajax({
        type: "POST",
        url: "/profile/update-personal-information",
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
            employer: $("#personalEmployer").val(),
            marital_status: $("#personalMaritalStatus").val(),
            address_line_one: $("#personalAddressLine1").val(),
            address_line_two: $("#personalAddressLine2").val(),
            town: $("#personalTown").val(),
            postcode: $("#personalPostcode").val(),
            property_duration: $("#personalPropertyDuration").val()
        },
        success: function(data) {
            if(data.error) {
                console.log(data.error);
            } else {
                setTimeout(() => {
                    $("#updatePersonalInformation").html("<i class='fas fa-fw fa-cloud-upload-alt'></i> Update Information");
                }, 2000);

                renderPersonalInformation();
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function deleteWillInProgress(id) {
    console.log("Will ID: " + id);
    if (confirm("Are you sure you want to delete this will? All current form data and progress will be permanently lost.")) {
        $.ajax({
            type: "POST",
            url: "/forms/delete-last-will-and-testament",
            data: {id: id},
            success: function(data) {
                if (data.success) {
                    alert("Successfully Deleted Will");
                    renderLastWillAndTestamentTable();
                } else {
                    alert(data.error);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
}

function continueWillProgression(id, progress) {
    console.log("Will ID: " + id + "\nProgress: " + progress);
    let params = "?id=" + id;
    let pageUri = [
        "/forms/last-will-and-testament-executors" + params,
        "/forms/last-will-and-testament-residual-estate" + params,
        "/forms/last-will-and-testament-funeral-arrangements" + params,
        "/forms/payment" + params
    ];
    window.location.href = pageUri[progress-1];
}

function formatDate(date) {
    date = new Date(date);
    let DD = date.getDate();
    if (DD < 10) {
        DD = "0" + DD;
    }
    let MM = date.getMonth() +1;
    if (MM < 10) {
        MM = "0" + MM;
    }
    const YYYY = date.getFullYear();
    return DD + "/" + MM + "/" + YYYY;
}


$(document).ready(() => {
   $("#displayWills").on("click", renderLastWillAndTestamentTable);
   $("#displayPersonalInformation").on("click", renderPersonalInformation());
   $("#updatePersonalInformation").on("click", updatePersonalInformation);
});