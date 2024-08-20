const joi = require ('joi')

const id = joi.number().integer().min(1).required()
const name = joi.string().required()
const content = joi.string().required()
const pub_date = joi.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/).required()
const cover_img_type = joi.number().integer().min(0).required()
const cover_img = joi.array().items(joi.object({url: joi.string()}))
const state = joi.number().integer().min(1)

module.exports.add_article_schema = {
    body: {
        title: name,  
        cate_id: id, 
        author_id: id, 
        content, 
        pub_date, 
        cover_img_type, 
        cover_img, 
        state, 
    }, 
}

module.exports.article_id_schema = {
    params: {
        id, 
    }, 
}

module.exports.update_article_schema = {
    body: { 
        id, 
        title: name,  
        cate_id: id, 
        content, 
        cover_img_type, 
        cover_img, 
        state
    },
}
