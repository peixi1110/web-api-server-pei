const joi = require ('joi')

const id = joi.number().integer().min(1).required()
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const content = joi.string().required()
const pub_date = joi.required()

module.exports.add_article_schema = {
    body: {
        title: name,  
        cate_id: id, 
        author_id: id, 
        content, 
        pub_date,
    }, 
}

module.exports.article_id_schema = {
    params: {
        id, 
    }, 
}

module.exports.update_article_sehema = {
    body: { 
        id,
        title: name,  
        cate_id: id, 
        content, 
    },
}