const db = require('../models')
const Doctor = db.doctor

exports.create = (req, res) => {
  // Validate request
  if (!req.body.doctorId) {
    res.status(400).send({ message: 'Content can not be empty!' })
    return
  }

  // Create a Tutorial
  const doctor = new Doctor({
    doctorId: req.body.doctorId,
    specjalnosci: req.body.specjalnosci,
    godzinyPracy: req.body.godzinyPracy,
  })

  // Save Tutorial in the database
  doctor
    .save(doctor)
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
  const nazwisko = req.query.nazwisko
  let condition = nazwisko
    ? { nazwisko: { $regex: new RegExp(nazwisko), $options: 'i' } }
    : {}

  Doctor.find(condition)
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

  Doctor.findById(id)
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

  Doctor.findByIdAndRemove(id)
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

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    })
  }

  const id = req.params.id

  Doctor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Doctor with id=${id}. Maybe Doctor was not found!`,
        })
      } else res.send({ message: 'Doctor was updated successfully.' })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Doctor with id=' + id,
      })
    })
}
