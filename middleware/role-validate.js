const { response } = require('express')

const isAdmin = (req, res = response, next) => {
    if(!req.user) return res.status(500).json({
        msg: 'Token not validated'
    })
    
    const { role, name } = req.user
    if(role !== 'ADMIN_ROLE') return res.status(401).json({
        msg: `${name} is not an admin`
    })

    next()
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if(!req.user) return res.status(500).json({
            msg: 'Token not validated'
        })

        if(!roles.includes(req.user.role)) return res.status(401).json({
            msg: `${req.user.name} is not in ${roles}`
        })

        next()
    }
}

module.exports = {
    isAdmin,
    hasRole
}
