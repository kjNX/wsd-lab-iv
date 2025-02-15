const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).json({
        msg: 'No token provided'
    })
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        const user = await User.findById(uid)
        if(!user) return res.status(401).json({
            msg: 'Auth user does not exist'
        })
        if(!user.status) return res.status(401).json({
            msg: 'Auth user has been deleted'
        })

        req.user = user

        next()
    } catch(error) {
        console.log(error)
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    validateJWT
}
