const User = require('../models/user')
const Role = require('../models/role')

const isRoleValid = async(role = '') => {
    const roleExists = await Role.findOne({ role })
    if(!roleExists) throw new Error(`Role ${role} does not exist`)
}

const emailExists = async(email = '') => {
    const emailExists = await Role.findOne({ email })
    if(emailExists) throw new Error(`Email ${email} already exists`)
}

const idExists = async(id) => {
    console.log(id)
    const userExists = await User.findById(id)
    console.log(userExists)
    if(!userExists) throw new Error(`User ${id} does not exist`)
}

module.exports = {
    isRoleValid,
    emailExists,
    idExists
}