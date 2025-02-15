const { Router } = require("express")
const { check } = require("express-validator")
const { login } = require("../controller/auth")
const {fieldCheck} = require("../middleware/field-check");
const {generateJWT} = require("../helpers/jwt-generate");
const router = Router()

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldCheck
], login)

module.exports = router