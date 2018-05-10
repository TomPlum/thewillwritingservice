function renderLastWillAndTestamentTable() {
    $.ajax({
        type: "POST",
        url: "/profile/get-wills",
        success: function(data) {
            //Render Table Here
            for (let i = 0; i < data.length; i++) {

            }
            $("#lastWillAndTestamentTable").html();
        },
        error: function(err) {
            console.log(err);
        }
    });
}