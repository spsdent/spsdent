const db = require('../models')
const Service = db.service

exports.create = (req, res) => {
  // Validate request
  if (!req.body.grupa) {
    res.status(400).send({ message: 'Content can not be empty!' })
    return
  }

  // Create a Tutorial
  const service = new Service({
    grupa: req.body.grupa,
    uslugi: req.body.uslugi,
  })

  // Save Tutorial in the database
  service
    .save(service)
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
  const grupa = req.query.grupa
  let condition = grupa
    ? { grupa: { $regex: new RegExp(grupa), $options: 'i' } }
    : {}

  Service.find(condition)
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

  Service.findById(id)
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

  Service.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Service with id=${id}. Maybe Service was not found!`,
        })
      } else {
        res.send({
          message: 'Service was deleted successfully!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Service with id=' + id,
      })
    })
}
