const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.URL_DB, {
        dbName: 'JDEX',
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            console.log("Fail connected DB");
            console.log(err);
        } else {
            console.log("Success Connecting with MongoDB");
        }
    });
}

mongoose.connection.on('error', (err) => {
    console.error('connected error', err);
});

module.exports = connect;