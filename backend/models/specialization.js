const mongoose = require('mongoose')

const Specialization = mongoose.model(
  'Specialization',
  new mongoose.Schema({
    name: String,
  })
)

module.exports = Specialization
