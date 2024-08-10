const express = require('express')
const router = express.Router()

const expressjoi = require('@escook/express-joi')
const userInfo = require('../router_handle/userInfo')
const {update_userinfo_schema, update_userpwd_schema, update_avatar_schema} = require('../schema/user') 



router.get('/userinfo', userInfo.getUserInfo)

router.post('/userinfo', expressjoi(update_userinfo_schema), userInfo.updateUserInfo)

router.post('/update/password', expressjoi(update_userpwd_schema), userInfo.updatePwd)

router.post('/update/avatar', expressjoi(update_avatar_schema), userInfo.updateAvatar)


module.exports = router