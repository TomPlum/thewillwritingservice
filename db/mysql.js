const mysql = require('mysql');

const details = {
    host:  "35.177.61.85",
    user: "dev",
    password: "University123-",
    database: "twp"
};

let connection = mysql.createConnection(details);

let connect = connection.connect(err => {
    if (err) {
        console.log("MySQL Error: " + err);
    } else {
        console.log("Successfully Connected To MySQL DB (" + details.database + ") @ " + details.host);
    }
});

module.exports = {
    connection: connection,
    connect: connect
};

