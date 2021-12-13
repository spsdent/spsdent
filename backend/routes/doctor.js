module.exports = (app) => {
  const doctors = require('../controllers/doctor.js')

  var router = require('express').Router()

  // Create a new Doctor
  router.post('/', doctors.create)

  // Retrieve all doctors
  router.get('/', doctors.findAll)

  // Retrieve a single Doctor with id
  router.get('/:id', doctors.findOne)

  // Delete a Doctor with id
  router.delete('/:id', doctors.delete)

  // Update a Doctor with id
  router.put("/:id", doctors.update);

  app.use('/api/doctors', router)
}
