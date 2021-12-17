const mongoose = require('mongoose')

const Doctor = mongoose.model(
  'Doctor',
  new mongoose.Schema({
    doctorId: String,
    specjalnosci: [
      {
        id: String,
        nazwa: String,
      },
    ],
    godzinyPracy: [Number],
  })
)

module.exports = Doctor
