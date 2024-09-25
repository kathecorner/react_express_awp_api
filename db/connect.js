const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");

const connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => {console.log("connected to the mongoDB")})
    .catch((err) => {console.log(err)});
};

module.exports = connectDB;