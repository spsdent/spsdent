const mongoose = require('mongoose')

const Doctor = mongoose.model(
  'Doctor',
  new mongoose.Schema({
    doctorId: String,
    specjalnosci: [String],
    godzinyPracy: [Number],
  })
)

module.exports = Doctor
