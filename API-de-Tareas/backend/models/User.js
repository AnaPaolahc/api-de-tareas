const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  usuario: String,
  password: String,
  nombre: String,
  email: String,
})

module.exports = mongoose.model('User', userSchema)