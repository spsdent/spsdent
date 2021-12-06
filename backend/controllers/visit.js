const db = require('../models')
const Visit = db.visits

exports.create = (req, res) => {
  // Validate request
  if (!req.body.usluga) {
    res.status(400).send({ message: 'Content can not be empty!' })
    return
  }

  // Create a Tutorial
  const visit = new Visit({
    usluga: req.body.usluga,
    specjalista: req.body.specjalista,
    data: req.body.data,
    godzina: req.body.godzina,
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    email: req.body.email,
    telefon: req.body.telefon,
    miasto: req.body.miasto,
    ulica: req.body.ulica,
    kodPocztowy: req.body.kodPocztowy,
    uid: req.body.uid,
    status: req.body.status ? req.body.status : false,
  })

  // Save Tutorial in the database
  visit.save(visit)
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
  const usluga = req.query.usluga
  let condition = usluga
    ? { usluga: { $regex: new RegExp(usluga), $options: 'i' } }
    : {}

  Visit.find(condition)
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

  Visit.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Visit with id ' + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error retrieving Visit with id=' + id })
    })
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    })
  }

  const id = req.params.id

  Visit.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Visit with id=${id}. Maybe Visit was not found!`,
        })
      } else res.send({ message: 'Visit was updated successfully.' })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Visit with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Visit.findByIdAndRemove(id)
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

exports.deleteAll = (req, res) => {
  Visit.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Visits were deleted successfully!`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Visits.',
      })
    })
}

exports.findAllByStatus = (req, res) => {
  Visit.find({ status: true })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      })
    })
}
