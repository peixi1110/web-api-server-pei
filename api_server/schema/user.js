const joi = require ('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{4,12}$/).required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()


module.exports.reg_login_schema = {
    body: {
        username, 
        password,
    },
}


module.exports.update_userinfo_schema = {
    body: {
        id, 
        nickname, 
        email,
    },
}


module.exports.update_userpwd_schema = {
    body: {
        oldPwd: password, 
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}


module.exports.update_avatar_schema = {
    body: {
        avatar,
    },
}