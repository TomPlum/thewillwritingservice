$(document).ready(() => {
    //Show Loading Modal
    $("#loadingModal").modal('show');
    $(".loading").html("<i class='fas fa-lg fa-fw fa-2x fa-spin fa-circle-notch'></i><p class='loading-text'>Loading your data...</p>");


    $.ajax({
        type: "POST",
        url: "/forms/get-last-will-and-testament",
        data: {id: getURLParameter("id")},
        success: function(data) {
            setTimeout(() => {
                renderWill(data);
            }, 3000);
            setTimeout(() => {
                $(".loading").html("<i class='fas fa-lg fa-fw fa-2x fa-spin fa-circle-notch'></i><p class='loading-text'>Finding a pen...</p>");
            }, 1000);
            setTimeout(() => {
                $(".loading").html("<i class='fas fa-lg fa-fw fa-2x fa-spin fa-circle-notch'></i><p class='loading-text'>Signing your Will...</p>");
            }, 2000);
            setTimeout(() => {
                $(".loading").html("<i class='fas fa-lg fa-fw fa-2x fa-check'></i><p class='loading-text'>Done</p>");
                $(".loading i").addClass("loading-green");
                $("#loadingWillClose").css("display", "initial");
            }, 3500);
        },
        error: function(err) {
            console.log(err);
        }
    });

    //Set Date
    const today = new Date();
    const YYYY = today.getFullYear();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "September", "November", "December"];
    const dayIndex = today.getDay();
    const MM = today.getMonth();
    const DD = today.getDate();
    $(".today").html(days[dayIndex] + " " + DD + getOrdinalSuffix(DD) + " " + months[MM] + " " + YYYY);
});

function renderWill(data) {
    const u = data.user;
    const w = data.willData;
    console.log(u);
    console.log(w);
    $(".name").html(u.first_name + " " + u.last_name);
    $(".town").html(u.town);
    $(".maritalStatus").html("2. I am " + u.marital_status + ".");
    $(".children").html(u.children_current + u.children_previous <= 0 ? "3. I do not have any living children." : "3. I have " + (u.children_current + u.children_previous) + " living children.");

    //Executors
    console.log(w.executors.length);
    if (w.executors.length === 1) {
        $(".executorName").html(w.executors[0].first_name  + " " + w.executors[0].last_name);
        $(".executorTown").html(w.executors[0].city);
        $(".executorCountry").html("England");
    } else {
        const div = $(".executors");
        div.html("5. I appoint the following people as the Executors of my Will.");
        for (let i = 0; i < w.executors.length; i++) {
            div.append("<p class='executor-info'>" + w.executors[i].first_name + " " + w.executors[i].last_name + " of " + w.executors[i].city + ", England.</p>");
        }
    }

    $(".testatorSignature").html(w.executors[0].first_name + " " + w.executors[0].last_name);
    $(".userSignature, .signatureName").html(u.first_name + " " + u.last_name);
    $(".staffSignature").html("Antony Brinkman");
    $(".signatureFirstLineAddress").html(u.address_line_1);
    $(".signatureSecondLineAddress").html(u.address_line_2);
    $(".signatureCityTown").html(u.town + ", England.");
    $(".signaturePostcode").html(u.postcode);

    $(".staffName").html("Antony Brinkman");
    $(".staffFirstLineAddress").html("Imperial House");
    $(".staffSecondLineAddress").html("Hornby Street");
    $(".staffCityTown").html("Bury, England.");
    $(".staffPostcode").html("BL9 5BN");
}