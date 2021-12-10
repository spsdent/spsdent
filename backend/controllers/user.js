const db = require('../models')
const User = db.user

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.')
}

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}

exports.specBoard = (req, res) => {
  res.status(200).send('Specialist Content.')
}

exports.findAll = (req, res) => {
  User.find({nazwisko: req.params.nazwisko})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}
