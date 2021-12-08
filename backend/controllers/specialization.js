const db = require('../models')
const Specialization = db.specialization

exports.create = (req, res) => {
  // Validate request
  if (!req.body.nazwa) {
    res.status(400).send({ message: 'Content can not be empty!' })
    return
  }

  // Create a Tutorial
  const specialization = new Specialization({
    nazwa: req.body.nazwa,
  })

  // Save Tutorial in the database
  specialization
    .save(specialization)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the visits.',
      })
    })
}

exports.findAll = (req, res) => {
  const nazwa = req.query.nazwa
  let condition = nazwa
    ? { nazwa: { $regex: new RegExp(nazwa), $options: 'i' } }
    : {}

  Specialization.find(condition)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving visits.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Specialization.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Visit with id ' + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error retrieving Visit with id=' + id })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Specialization.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Visit with id=${id}. Maybe Visit was not found!`,
        })
      } else {
        res.send({
          message: 'Visit was deleted successfully!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Visit with id=' + id,
      })
    })
}
