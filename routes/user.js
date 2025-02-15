const { Router } = require("express")
const { query, param, body } = require("express-validator")
const { userGet, userPut, userPost, userDelete, userPatch }  = require("../controller/user")
const { isRoleValid, emailExists, idExists } = require("../helpers/db-validators")
// const {fieldCheck} = require("../middleware/field-check")
// const {validateJWT} = require("../middleware/jwt-validate")
// const {isAdmin, hasRole} = require("../middleware/role-validate")
const { fieldCheck, validateJWT, isAdmin, hasRole } = require('../middleware')

const router = Router()

router.get('/', [
    query('limit', 'Not a valid number').isInt(),
    query('from', 'Not a valid number').isInt(),
    fieldCheck
], userGet)

router.put('/:id', [
    param('id', 'Not a valid ID').isMongoId(),
    param('id').custom(idExists),
    body('role').custom(isRoleValid),
    fieldCheck
], userPut)

router.post('/', [
        body('name', 'Name cannot be empty').not().isEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('email').custom(emailExists),
        body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
        // body('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        body('role').custom(isRoleValid),
        fieldCheck
    ], userPost)

router.delete('/:id', [
    validateJWT,
    // isAdmin,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    param('id', 'Not a valid ID').isMongoId(),
    param('id').custom(idExists),
    fieldCheck
], userDelete)

router.patch('/', userPatch)

module.exports = router