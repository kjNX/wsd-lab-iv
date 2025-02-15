const fieldCheck = require('./field-check')
const validateJWT = require('./jwt-validate')
const roleValidate = require('./role-validate')

module.exports = {
    ...fieldCheck,
    ...validateJWT,
    ...roleValidate
}