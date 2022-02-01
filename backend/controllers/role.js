const db = require('../models')
const Role = db.role

exports.findAll = (req, res) => {
  Role.find()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Wystąpił błąd podczas pobierania rol.',
      })
    })
}
