const db = require('../models')
const Service = db.service

exports.create = (req, res) => {
  // Validate request
  if (!req.body.grupa) {
    res.status(400).send({ message: 'Zawartość nie może być pusta!' })
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
          err.message || 'Wystąpił błąd podczas tworzenia specjalizacji.',
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
        message: err.message || 'Wystąpił błąd podczas pobierania specjalizacji.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Service.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Nie znaleziono specjalizacji o id= ' + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Wystąpił błąd podczas pobierania specjalizacji o id=' + id })
    })
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dane do aktualizacji nie mogą być puste!',
    })
  }

  const id = req.params.id

  Service.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie można zaktualizować specjalizacji o id=${id}. Możliwe że specjalizacja nie istnieje!`,
        })
      } else res.send({ message: 'Specjalizacja została zaktualizowana!' })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Wystąpił błąd podczas aktualizacji specjalizacji o id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Service.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie można usunąć specjalizacji o id=${id}. Możliwe że specjalizacja nie istnieje!`,
        })
      } else {
        res.send({
          message: 'Specjalizacja została zaktualizowana!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Nie można usunąć specjalizacji o id=' + id,
      })
    })
}
