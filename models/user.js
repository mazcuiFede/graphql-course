const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    age: Number,
    date: String
})

const User = mongoose.model("user", userSchema)

module.exports = User