const { Schema, model } = require('mongoose')
const Role = require('./role')
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        // enum: Role.find({}, 'role')
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user} = this.toObject()
    return user
}

module.exports = model("User", UserSchema)