$("#clientDataForm").validate({
    rules: {
        username: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        first_name: {
            required: true
        },
        last_name: {
            required: true
        },
        date_of_birth: {
            required: true
        },
        tel_mobile: {
            required: true
        },
        tel_home: {
            required: true
        },
        nationality: {
            required: true
        }
    },
    messages: {

    }
});