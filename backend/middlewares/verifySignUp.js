const db = require('../models')
const ROLES = db.ROLES
const User = db.user

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (user) {
      res
        .status(400)
        .send({
          message: 'Podany adres e-mail jest aktualnie używany',
        })
      return
    }

    next()
  })
}

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Błąd! Rola ${req.body.roles[i]} nie istnieje!`,
        })
        return
      }
    }
  }

  next()
}

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
}

module.exports = verifySignUp
