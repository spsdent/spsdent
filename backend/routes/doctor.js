module.exports = (app) => {
  const doctors = require('../controllers/doctor.js')

  var router = require('express').Router()

  // Create a new Tutorial
  router.post('/', doctors.create)

  // Retrieve all doctors
  router.get('/', doctors.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:id', doctors.findOne)

  // Delete a Tutorial with id
  router.delete('/:id', doctors.delete)

  app.use('/api/doctors', router)
}
