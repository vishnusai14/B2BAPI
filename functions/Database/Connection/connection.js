const mongoose = require("mongoose");

const connect  = (uri) => {
    mongoose.connect(uri)
        .then((res) => {
            console.log("DataBase Connected")
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
};

module.exports = connect;