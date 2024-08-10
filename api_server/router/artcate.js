const express = require('express')
const router = express.Router()
const expressjoi = require('@escook/express-joi')
const {add_cate_schema, id_schema, update_cate_schema} = require('../schema/articleCate')


const artcate = require('../router_handle/artcate')



router.get('/cates', artcate.getArticleCates)

router.post('/addcates', expressjoi(add_cate_schema), artcate.addAriticleCates)

router.get('/is_delete/:id' , expressjoi(id_schema), artcate.deleteCateById)

router.get('/resume/:id' , expressjoi(id_schema), artcate.resumeCateById)

router.get('/cates/:id', expressjoi(id_schema), artcate.getArtCateById)

router.post('/updatecate', expressjoi(update_cate_schema), artcate.updateCate)





module.exports = router