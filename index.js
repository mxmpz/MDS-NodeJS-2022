//Version a l'ancienne

// const http = require('http')

 //Ancienne méthode
 // const server = http.createServer((req,res) => {
 // })

 //Nouvelle méthode avec fonction fléchée
// const server = http.createServer((req,res) => {
//     res.end('Ceci est la réponse de mon serveur')
// })

// server.listen(3000)

const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello world TOTO !')
})

app.listen(port, () => {
    console.log('Server is running on port' + port)
})