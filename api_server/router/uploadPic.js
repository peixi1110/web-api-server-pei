const express = require('express')
const router = express()
const path = require('path')

const picutres = require('../router_handle/uploadPic')
const uploadPic = require('../middleWare/uploadPic')

router.use('/cover', express.static(path.join(__dirname, '..', 'public/cover')));

router.post('/cover', uploadPic.array('cover_img', 3), picutres.uploadPic)

router.post('/cover/read', picutres.readPic)

module.exports = router 