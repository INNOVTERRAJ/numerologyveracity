const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    birthdate: String,
    numerologyNumber: Number,
});

module.exports = mongoose.model("User", userSchema);
