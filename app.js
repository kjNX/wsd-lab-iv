require('dotenv').config()
// const express = require('express')
// const app = express()

const Server = require('./models/server')

// console.log('Hola mundo')

/*
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT)
})
*/

const server = new Server()
server.listen()
