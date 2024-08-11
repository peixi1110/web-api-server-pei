const express = require('express')
const router = express()

const picutres = require('../router_handle/pictures')
const { uploadPic, uploadAvatar }= require('../middleWare/unploadMiddleWare')


router.post('/cover', uploadPic.single('cover_img'), picutres.uploadPic)

router.post('/avatar', uploadAvatar.single('avatar'), picutres.uploadAvatar)


module.exports = router 