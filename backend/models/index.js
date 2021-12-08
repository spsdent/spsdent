const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.visits = require('./visit')(mongoose)
db.user = require('./user')
db.role = require('./role')
db.specialization = require('./specialization')
db.doctor = require('./doctor')
db.service = require('./service')

db.ROLES = ['user', 'admin', 'spec']

module.exports = db
