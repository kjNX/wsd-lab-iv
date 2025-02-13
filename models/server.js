const express = require('express')
const cors = require('cors')
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.userPath = '/api/users'
        this.connectDB()
        this.middleware()
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'))

        /*
        this.app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        this.app.get('/api', (req, res) => {
            // res.json('Hello World!')
            res.json({
                // ok: true,
                msg: 'get API'
            })
        })

        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'put API'
            })
        })

        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'post API'
            })
        })

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API'
            })
        })
        */
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }
}

module.exports = Server