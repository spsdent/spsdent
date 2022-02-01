const { authJwt } = require('../middlewares')
const controller = require('../controllers/user')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/users/:nazwisko', controller.findByLastName)

  app.get('/api/users', controller.findAllUsers)

  app.delete('/api/users/:id', controller.deleteUser)

  app.put('/api/users/:id', controller.updateUser)

}
