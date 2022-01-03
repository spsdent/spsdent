const config = require('../config/auth')
const db = require('../models')
const User = db.user
const Role = db.role

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  const user = new User({
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    telefon: req.body.telefon,
    miasto: req.body.miasto,
    ulica: req.body.ulica,
    kodPocztowy: req.body.kodPocztowy,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }

            res.send({ message: 'Uztkownik zostal zarejestrowany!' })
          })
        }
      )
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        user.roles = [role._id]
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          res.send({ message: 'Uztkownik zostal zarejestrowany!' })
        })
      })
    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res
          .status(404)
          .send({ message: 'Nie ma użytkownika o podanym adresie e-mail' })
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Nieprawidłowe hasło',
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      })

      var authorities = []

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
      }
      res.status(200).send({
        id: user._id,
        imie: user.imie,
        nazwisko: user.nazwisko,
        telefon: user.telefon,
        miasto: user.miasto,
        ulica: user.ulica,
        kodPocztowy: user.kodPocztowy,
        email: user.email,
        roles: authorities,
        accessToken: token,
      })
    })
}

exports.changePwd = (req, res) => {
  User.updateOne(
    { email: req.body.email },
    { password: bcrypt.hashSync(req.body.password, 8) }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nie mozna zaktualizowac hasla uzytkownika o adresie e-mail=${req.body.email}. Mozliwe ze nie ma takiego uzytkownika.`,
        })
      } else {
        res.send({ message: 'Haslo zostalo zmienione pomyslnie' })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Wystapil blad podczas zmiany hasla',
      })
    })
}
