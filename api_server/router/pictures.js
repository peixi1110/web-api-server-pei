const express = require('express')
const router = express()

const expressjoi = require('@escook/express-joi')

const multer = require('multer')
const upload = multer({ dest: './public'})

const picutres = require('../router_handle/pictures')

router.post('/upload', upload.single('picture'), picutres.uploadPic)

// router.post('/avatar', upload.single('avatar'), picutres.uploadAvatar)

// router.post('/cover', upload.single('cover'), picutres.uploadCover)

// router.get('/getpics', picutres.getPics)


module.exports = router;