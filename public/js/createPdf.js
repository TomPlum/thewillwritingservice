$(document).ready(() => {
    $("#viewPdf").on("click", function() {
        window.location.href="/forms/view-pdf?id=" + getURLParameter("id");
    });
});
