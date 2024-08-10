const express = require('express')
const router = express()

const article = require('../router_handle/article')

const expressjoi = require('@escook/express-joi')
const {
    add_article_schema, 
    article_id_schema, 
    update_article_sehema
} = require('../schema/article')

router.post('/addarticle', expressjoi(add_article_schema), article.addArticle)

router.get('/articleinfo', article.getArticleInfo)

router.post('/updatearticle', expressjoi(update_article_sehema), article.updateArticleById)

router.get('/deletearticle/:id', expressjoi(article_id_schema), article.deleteArticleById)

router.get('/resumearticle/:id', expressjoi(article_id_schema), article.resumeArticleById)

router.get('/getarticle/:id', expressjoi(article_id_schema), article.getArticleById)


module.exports = router