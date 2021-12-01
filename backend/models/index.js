const dbConfig = require('../config/db')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.visits = require('./visit')(mongoose)

module.exports = db
