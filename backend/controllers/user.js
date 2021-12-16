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
  User.find({ nazwisko: req.params.nazwisko })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}

exports.findAllUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}

exports.updateUser = (req, res) => {
  const id = req.params.id

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        })
      } else {
        res.send({
          message: 'User was updated successfully!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not update User with id=' + id,
      })
    })
}

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        })
      } else {
        res.send({
          message: 'User was deleted successfully!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      })
    })
}
