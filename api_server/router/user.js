// only include rules

const express = require('express')
const router = express.Router()

const userHandler = require('../router_handle/user')

const expressjoi = require('@escook/express-joi')
const {reg_login_schema} = require('../schema/user')

// register user
router.post('/regiser', expressjoi(reg_login_schema), userHandler.regUser)

// login
router.post('/login', expressjoi(reg_login_schema), userHandler.login)



module.exports = router