const mongoose = require('mongoose')

const Doctor = mongoose.model(
  'Doctor',
  new mongoose.Schema({
    imie: String,
    nazwisko: String,
    email: String,
    telefon: Number,
    specjalnosci: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization',
      },
    ],
  })
)

module.exports = Doctor
