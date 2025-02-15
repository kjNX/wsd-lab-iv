const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const { generateJWT } = require('../helpers/jwt-generate');
const {googleVerify} = require("../helpers/google-verify");

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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body
    try {
        // const googleUser = await googleVerify(id_token)
        const { name, img, email } = await googleVerify(id_token)
        let user = await User.findOne({ email })
        if(!user) {
            const data = {
                name,
                email,
                password: ':P',
                role: 'USER_ROLE',
                img,
                google: true
            }
            user = new User(data)
            await user.save()
        }
        if(!user.status) return res.status(400).json({
            msg: 'User has been blocked. Contact the administrator',
        })
        const token = await generateJWT(user.id)
        // console.log(googleUser)
        res.json({
            // msg: 'Working!',
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: "Couldn't verify token",
        })
    }
}

module.exports = {
    login,
    googleSignIn
}