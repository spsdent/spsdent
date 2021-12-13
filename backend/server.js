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
const Doctor = db.doctor
const Service = db.service

db.mongoose
  .connect(
    `mongodb://${dbConfig.HOST}:${dbConfig.PWD}@spscluster-shard-00-00.sa81d.mongodb.net:27017,spscluster-shard-00-01.sa81d.mongodb.net:27017,spscluster-shard-00-02.sa81d.mongodb.net:27017/${dbConfig.DB}?ssl=true&replicaSet=atlas-3lyac2-shard-0&authSource=admin&retryWrites=true&w=majority`,
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
  Doctor.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Doctor({
        imie: 'Jan',
        nazwisko: 'Nowak',
        telefon: '123123123',
        email: 'jannowak@gmail.com',
        specjalnosci: ['wybielanie'],
        godzinyPracy: [8, 9, 10, 11, 12, 13, 14, 15, 16]
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
        specjalnosci: ['stomatologia zachowawcza', 'endodoncja'],
        godzinyPracy: [8, 9, 10, 11, 12, 13, 14, 15, 16]
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
        specjalnosci: ['endodoncja', 'wybielanie'],
        godzinyPracy: [8, 9, 10, 11, 12, 13, 14, 15, 16]
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'Adrian Nowak' to doctors collection")
      })
    }
  })

  Service.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Service({
        grupa: 'stomatologia zachowawcza',
        uslugi: [{
          nazwa: 'znieczulenie miejscowe',
          cena: 50
        }, {
          nazwa: 'znieczulenie komputerowe  THE WAND',
          cena: 70
        },{
          nazwa: 'opatrunek',
          cena: 50
        },{
          nazwa: 'znoszenie nadwrazliwosci',
          cena: 30
        },]
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'stomatologia zachowawcza' to services collection")
      })

      new Service({
        grupa: 'endodoncja',
        uslugi: [{
          nazwa: 'zeba jednokanałowego',
          cena: 500
        },{
          nazwa: 'zeba dwukanalowego',
          cena: 700
        },{
          nazwa: 'zeba trzykanalowego',
          cena: 800
        },]
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'endodoncja' to services collection")
      })

      new Service({
        grupa: 'wybielanie',
        uslugi: [{
          nazwa: 'wybielanie zebow(metoda nakladkowa)',
          cena: 900
        },{
          nazwa: 'wybielanie zebow(system beyond)',
          cena: 1200
        },{
          nazwa: 'wybielanie zeba martwego',
          cena: 200
        },]
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'wybielanie' to services collection")
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

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
