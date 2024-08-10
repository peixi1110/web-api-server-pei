// apis about article
import { request } from "@/utils";

export function createArticleAPI (data) {
    return request ({
        url: '/my/article/addarticle', 
        method: 'POST', 
        data
    })
}

export function getArticleListAPI (params) {
    return request({
        url: '/my/article/articleinfo', 
        method: 'GET', 
        params
    })
}


export function deleteArticleAPI (id) {
    return request({
        url: `/my/article/deletearticle/${id}`, 
        method: 'POST'
    })
}