$(document).ready(() => {
    $.ajax({
        type: "POST",
        url: "/forms/get-last-will-and-testament",
        data: {id: getURLParameter("id")},
        success: function(data) {
            renderWill(data);
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
    const w = data.will;
    console.log(u);
    console.log(w);
    $(".name").html(u.first_name + " " + u.last_name);
    $(".town").html(u.town);
}