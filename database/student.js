const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    father: String,
    mother: String,
    class: Number,
    roll: Number,
    year: Number,
    registration: {
        type: String,
        unique: true
    }
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = {studentSchema, Student};