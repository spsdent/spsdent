const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    imie: String,
    nazwisko: String,
    email: String,
    telefon: Number,
    miasto: String,
    ulica: String,
    kodPocztowy: Number,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  })
)

module.exports = User
