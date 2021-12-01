const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
const dbConfig = require('./config/db')
db.mongoose
  .connect(
    `mongodb+srv://${dbConfig.HOST}:${dbConfig.PWD}@spscluster.sa81d.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SPSdent app.' })
})

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'user' to roles collection")
      })

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'admin' to roles collection")
      })

      new Role({
        name: 'spec',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'spec' to roles collection")
      })
    }
  })
}

// routes
require('./app/routes/auth')(app)
require('./app/routes/user')(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
