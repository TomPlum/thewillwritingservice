$(document).ready(() => {
    $("#viewPdf").on("click", function() {
        $.ajax({
            type: "POST",
            url: "/forms/view-will-pdf",
            data: {lastWillAndTestamentId: getURLParameter("id")},
            success: function(data) {
                createPdf(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});

function createPdf(data) {
    console.log(data);
}
