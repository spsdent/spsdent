module.exports = (app) => {
  const roles = require('../controllers/role.js')

  var router = require('express').Router()

  // Retrieve all roles
  router.get('/', roles.findAll)

  app.use('/api/roles', router)
}
