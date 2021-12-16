module.exports = (app) => {
  const services = require('../controllers/service.js')

  var router = require('express').Router()

  // Create a new Tutorial
  router.post('/', services.create)

  // Retrieve all services
  router.get('/', services.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:id', services.findOne)

  // Update a service
  router.put('/:id', services.update)

  // Delete a Tutorial with id
  router.delete('/:id', services.delete)

  app.use('/api/services', router)
}
