const mongoose = require('mongoose')

const Doctor = mongoose.model(
  'Doctor',
  new mongoose.Schema({
    imie: String,
    nazwisko: String,
    email: String,
    telefon: Number,
    specjalnosci: [String],
    godzinyPracy: [Number]
  })
)

module.exports = Doctor
