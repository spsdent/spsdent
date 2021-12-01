const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.visits = require('./visit')(mongoose)

module.exports = db
