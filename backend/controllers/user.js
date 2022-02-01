const db = require('../models')
const User = db.user

exports.findByLastName = (req, res) => {
  User.find({})
    .then((data) => {
      const filteredUsers = data.filter(
        (user) =>
          user.nazwisko.toLowerCase() === req.params.nazwisko.toLowerCase()
      )
      res.send(filteredUsers)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Wystąpił błąd podczas pobierania użytkowników.',
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
        message: err.message || 'Wystąpił błąd podczas pobierania użytkowników.',
      })
    })
}

exports.updateUser = (req, res) => {
  const id = req.params.id

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie można zaktualizować użytkownika o id=${id}. Możliwe że użytkownik nie istnieje`,
        })
      } else {
        res.send({
          message: 'Użytkownik został zaktualizowany!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Nie można zaktualizować użytkownika o id=' + id,
      })
    })
}

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie można usunąć użytkownika o id=${id}. Możliwe że użytkownik nie istnieje!`,
        })
      } else {
        res.send({
          message: 'Użytkownik został usunięty!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Nie można usunąć użytkownika o id=' + id,
      })
    })
}
