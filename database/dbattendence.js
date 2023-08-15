const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    date: Number,
    month: String,
    year: Number,
    class: Number,
    attn: [Number]
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;