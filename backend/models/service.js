const mongoose = require('mongoose')

const Service = mongoose.model(
  'Service',
  new mongoose.Schema({
    grupa: String,
    uslugi: [
      {
        nazwa: String,
        cena: Number,
      },
    ],
  })
)

module.exports = Service
