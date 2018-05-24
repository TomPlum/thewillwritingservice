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
        },
        children_this_relationship: {
            required: true,
            digits: true
        },
        children_last_relationship: {
            required: true,
            digits: true
        },
        children_under_eighteen: {
            required: true
        },
        address_line_1: {
            required: true
        },
        address_line_2: {
            required: true
        },
        town: {
            required: true
        },
        postcode: {
            required: true
        },
        property_duration: {
            required: true
        },
        job_title: {
            required: true
        },
        employer: {
            required: true
        }
    },
    messages: {

    }
});

