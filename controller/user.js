const { response } = require('express')

const userGet = (req, res = response) => {
    const { q, name = 'Not sent', apikey } = req.query
    res.json({
        msg: 'get API - controller',
        q,
        name,
        apikey
    })
}

const userPut = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: 'put API - controller',
        id
    })
}

const userPost = (req, res = response) => {
    const { name, age } = req.body
    res.json({
        msg: 'post API - controller',
        name,
        age
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}