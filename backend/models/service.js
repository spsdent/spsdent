const mongoose = require('mongoose')

const Service = mongoose.model(
  'Service',
  new mongoose.Schema({
    grupa: String,
    nazwa: String,
  })
)

module.exports = Service
