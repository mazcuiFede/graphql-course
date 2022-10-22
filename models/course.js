const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: String,
    languaje: String,
    date: String,
    professorId: String
})

const Course = mongoose.model("course", courseSchema)

module.exports = Course 