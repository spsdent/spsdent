module.exports = (app) => {
  const specializations = require('../controllers/specialization.js')

  var router = require('express').Router()

  // Create a new Tutorial
  router.post('/', specializations.create)

  // Retrieve all specializations
  router.get('/', specializations.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:id', specializations.findOne)

  // Delete a Tutorial with id
  router.delete('/:id', specializations.delete)

  app.use('/api/specializations', router)
}
