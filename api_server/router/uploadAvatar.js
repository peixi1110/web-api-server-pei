const express = require('express')
const router = express()
const path = require('path')

const avatar = require('../router_handle/uploadAvatar')
const uploadAvatar = require('../middleWare/uploadAvatar')

router.use('/avatar', express.static(path.join(__dirname, '..', 'public/avatar')));

router.post('/avatar', uploadAvatar.array('avatar', 1), avatar.uploadAvatar)

router.post('/avatar/read', avatar.readAvatar)

router.delete('/avatar/delete', avatar.deleteAvatar)

module.exports = router 