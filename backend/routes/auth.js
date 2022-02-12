const { verifySignUp } = require('../middlewares')
const controller = require('../controllers/auth')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post(
    '/api/auth/signup',
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    controller.signup
  )

  app.post('/api/auth/signin', controller.signin)

  app.post('/api/auth/passwordchange', controller.changePwd)
  app.post('/api/auth/passwordreset', controller.resetPwd)
}
