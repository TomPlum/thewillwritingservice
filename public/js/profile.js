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
                                    "<th>Action</th>"+
                                "</tr>" +
                            "</thead>";

            for (let i = 0; i < data.length; i++) {
                tBody += "<tr>";
                tBody += "<td>" + data[i].lwat_id + "</td>";
                tBody += "<td>" + formatDate(data[i].date) + "</td>";
                tBody += "<td>" + formatProgress(data[i].progress) + "</td>";
                tBody += "<td><i class='fas fa-fw fa-check fa-lg'></i> or <i class='fas fa-fw fa-times fa-lg'></i></td>";
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
            $("#personalFirstName").val(data.first_name);
            $("#personalLastName").val(data.last_name);
            $("#personalUsername").val(data.username);
            $("#personalEmail").val(data.email);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function formatProgress(stage) {
    const stages = ["Appointment of Executors", "Legacies", "Residual Estate", "Funeral Arrangements", "Awaiting Payment"];
    return "Stage " + stage + "/5 - " + stages[stage-1];
}

function updatePersonalInformation() {
    $.ajax({
        type: "POST",
        url: "/profile/update-personal-information",
        data: {
            username: $("#personalUsername").val(),
            email: $("#personalEmail").val(),
            first_name: $("#personalFirstName").val(),
            last_name: $("#personalLastName").val(),
        },
        success: function(data) {
            if(data) {
                console.log(data);
            } else {
                renderPersonalInformation();
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function deleteWillInProgress() {

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