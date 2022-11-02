// Version a l'ancienne

// const http = require('http')

// Ancienne méthode
// const server = http.createServer((req,res) => {
// })

// Nouvelle méthode avec fonction fléchée
// const server = http.createServer((req,res) => {
//     res.end('Ceci est la réponse de mon serveur')
// })

// server.listen(3000)

const express = require('express')
const app = express()
const port = 3000

// Connexion à la base de données
const connect = require('./data/helpers/db')
connect()

// Paramétrage de Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// On branche notre route users sur le fichier correspondant, le nom index.js est utilisé par défaut.
app.use('/users', require('./routes/users'))
app.use('/users/{id}', require('./routes/users'))

app.use('/auth', require('./routes/auth'))

app.use('/protected', require('./routes/protected'))

// On importe le logger
const logger = require('./middlewares/logger')
// On dit à Express d'utiliser le logger en tant que middleware
app.use(logger)

app.get('/', (req, res) => {
  res.send('Hello world TOTO !')
})

app.listen(port, () => {
  console.log('Server is running on port' + port)
})
