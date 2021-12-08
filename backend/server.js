const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

let corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const db = require('./models')
const dbConfig = require('./config/db')
const Role = db.role
const Specialization = db.specialization
const Doctor = db.doctor

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
    initial()
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SPSdent app.',
  })
})

function initial() {
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
  Specialization.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Specialization({
        name: 'ortodoncja',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'ortodoncja' to specializations collection")
      })

      new Specialization({
        name: 'protetyka stomatologiczna',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log(
          "added 'protetyka stomatologiczna' to specializations collection"
        )
      })

      new Specialization({
        name: 'stomatologia dziecieca',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log(
          "added 'stomatologia dziecieca' to specializations collection"
        )
      })

      new Specialization({
        name: 'stomatologia zachowawcza z endodoncja',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log(
          "added 'stomatologia zachowawcza z endodoncja' to specializations collection"
        )
      })

      new Specialization({
        name: 'chirurgia stomatologiczna',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log(
          "added 'chirurgia stomatologiczna' to specializations collection"
        )
      })
    }
  })
  Doctor.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Doctor({
        imie: 'Jan',
        nazwisko: 'Nowak',
        telefon: '123123123',
        email: 'jannowak@gmail.com',
        specjalnosci: ['ortodoncja', 'chirurgia stomatologiczna'],
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'Jan Nowak' to doctors collection")
      })

      new Doctor({
        imie: 'Krzysztof',
        nazwisko: 'Kowalski',
        telefon: '987654321',
        email: 'kkowalski@gmail.com',
        specjalnosci: ['stomatologia zachowawcza z endodoncja'],
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'Krzysztof Kowalski' to doctors collection")
      })

      new Doctor({
        imie: 'Adrian',
        nazwisko: 'Nowak',
        telefon: '951753842',
        email: 'dwabulki@gmail.com',
        specjalnosci: ['stomatologia dziecieca', 'protetyka stomatologiczna'],
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'Adrian Nowak' to doctors collection")
      })
    }
  })
}

// routes
require('./routes/auth')(app)
require('./routes/user')(app)
require('./routes/visit')(app)
require('./routes/doctor')(app)
require('./routes/service')(app)
require('./routes/specialization')(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
