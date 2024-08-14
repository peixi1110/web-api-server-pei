const express = require('express')
const router = express()

const avatar = require('../router_handle/uploadAvatar')
const uploadAvatar = require('../middleWare/uploadAvatar')

router.post('/avatar', uploadAvatar.single('avatar'), avatar.uploadAvatar)


module.exports = router 