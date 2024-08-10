const joi = require ('joi')

const id = joi.number().integer().min(1).required()
const name = joi.string().required()
const alias = joi.string().alphanum().required()


module.exports.add_cate_schema = {
    body: {
        name, 
        alias, 
    }, 
}

module.exports.id_schema = {
    params: {
        id, 
    }, 
}

module.exports.update_cate_schema = {
    body: {
        id, 
        name,
        alias, 
    },
}