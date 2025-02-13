const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { validationResult } = require('express-validator')

const userGet = async(req, res = response) => {
    // const { q, name = 'Not sent', apikey } = req.query
    const { limit = 5, from = 0 } = req.query
    const query = { status: true }
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    // const users = await User.find(query).skip(Number(from)).limit(Number(limit))
    // const total = await User.countDocuments(query)
    res.json({
        // msg: 'get API - controller',
        // q,
        // name,
        // apikey
        total,
        users
    })
}

const userPut = async(req, res = response) => {
    const { id } = req.params
    const { _id, password, google, email, ...exc } = req.body
    if(password) {
        const salt = bcrypt.genSaltSync(10)
        exc.password = bcrypt.hashSync(password, salt)
    }
    const user = await User.findByIdAndUpdate(id, exc)
    res.json({
        // msg: 'put API - controller',
        user
    })
}

const userPost = async(req, res = response) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) return res.status(400).json(errors)

    // const { name, age } = req.body
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })
    const emailExists = await User.findOne({ email })
    if (emailExists) return res.status(400).json({ msg: 'Email already exists' })
    const salt = bcrypt.genSaltSync(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    res.json({
        // msg: 'post API - controller',
        user
    })
}

const userDelete = async(req, res = response) => {
    const { id } = req.params
    // const user = await User.findByIdAndDelete(id)

    const user = await User.findByIdAndUpdate(id, { status: false })
    res.json({
        // msg: 'delete API - controller',
        user
    })
}

const userPatch = (req, res = response) => {
    res.json({
        // msg: 'patch API - controller'
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}