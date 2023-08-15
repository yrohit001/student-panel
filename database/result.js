const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    date: Number,
    month: String,
    year: Number,
    class: Number,
    testname: String,
    subject: String,
    maxsco: Number,
    score: [Number]
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;