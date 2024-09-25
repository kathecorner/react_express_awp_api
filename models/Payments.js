const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    session_href: {
        type: String,
        required: [false, "1 - Create Session"],
        trim: true,
        maxlength: 400
    },
    uniqueid: {
        type: String,
        required: [true, "1 - Create Session"],
        trim: true,
        maxlength: 400
    },
});

module.exports = mongoose.model("Payment", paymentSchema);