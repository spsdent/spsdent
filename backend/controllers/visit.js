const db = require('../models')
const Visit = db.visits

exports.create = (req, res) => {
  // Validate request
  if (!req.body.usluga) {
    res.status(400).send({ message: 'Zawartość nie może być pusta!' })
    return
  }

  // Create a Tutorial
  const visit = new Visit({
    grupa: req.body.grupa,
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
    cena: req.body.cena,
    uid: req.body.uid,
    status: req.body.status ? req.body.status : false,
  })

  // Save Tutorial in the database
  visit
    .save(visit)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Wystąpił błąd podczas tworzenia wizyty.',
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
        message: err.message || 'Wystąpił błąd podczas pobierania wizyt.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Visit.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Nie znaleziono wizyty o id= ' + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Błąd podczas pobierania wizyty o id=' + id })
    })
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dane do aktualizacji nie mogą być puste!',
    })
  }

  const id = req.params.id

  Visit.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie można zaktualizować wizyty o id=${id}. Możliwe że wizyta nie istnieje`,
        })
      } else res.send({ message: 'Wizyta została zaktualizowana!' })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Błąd podczas aktualizacji wizyty o id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Visit.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie można usunąć wizyty o id=${id}. Możliwe że wizyta nie istnieje`,
        })
      } else {
        res.send({
          message: 'Wizyta została usunięta!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Nie można usunąć wizyty o id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Visit.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Wizyty zostały usunięte!`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Wystapił błąd podczas usuwania wizyt',
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
          err.message || 'Wystąpił błąd podczas pobierania wizyt',
      })
    })
}
