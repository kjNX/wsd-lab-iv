const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const { generateJWT } = require('../helpers/jwt-generate');

const login = async(req, res = response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({
            msg: 'User not found',
        })
        const validPassword  = bcrypt.compareSync(password, user.password)
        if(!validPassword) return res.status(400).json({
            msg: 'Incorrect password',
        })
        const token = await generateJWT(user.id)

        res.json({
            msg: 'Login successful',
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Internal Server Error',
        })
    }
}

module.exports = {
    login
}