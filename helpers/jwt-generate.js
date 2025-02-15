const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '4d'
    }, (err, token) => {
        if(err) {
            console.log(err)
            reject('Could not generate token')
        } else resolve(token)
    })
})

module.exports = {
    generateJWT
}