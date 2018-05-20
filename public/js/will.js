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
});

function renderWill(data) {
    const u = data.user;
    const w = data.will;
    $(".name").html(u.first_name + " " + u.last_name);
    $(".town").html(u.town);
}