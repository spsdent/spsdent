const db = require('../models')
const Doctor = db.doctor

exports.create = (req, res) => {
  // Validate request
  if (!req.body.doctorId) {
    res.status(400).send({ message: 'Zawartość nie może być pusta!' })
    return
  }

  const doctor = new Doctor({
    doctorId: req.body.doctorId,
    specjalnosci: req.body.specjalnosci,
    godzinyPracy: req.body.godzinyPracy,
  })

  doctor
    .save(doctor)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Wystąpił błąd podczas tworzenia profilu lekarza.',
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
        message: err.message || 'Wystąpił błąd podczas pobierania profilu lekarza.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Doctor.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Nie znaleziono lekarza o id= ' + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Nie znaleziono lekarza o id= ' + id })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Doctor.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie można usunąć lekarza o id=${id}. Możliwe że taki profil nie został znaleziony!`,
        })
      } else {
        res.send({
          message: 'Profil lekarza usunięty pomyślnie!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Nie można usunąć profilu lekarza o id= ' + id,
      })
    })
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dane do aktualizacji profilu nie mogą być puste!',
    })
  }

  const id = req.params.id

  Doctor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie można zaktualizować profilu lekarza o id=${id}. Możliwe że profil lekarza nie został znaleziony!`,
        })
      } else res.send({ message: 'Profil lekarza został zaktualizowany!' })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Wystąpił błąd podczas aktualizacji profilu lekarza o id= ' + id,
      })
    })
}
