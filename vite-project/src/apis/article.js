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
        method: 'GET'
    })
}

export function getArticleInfoAPI (id) {
    return request({
        url:  `/my/article/getarticle/${id}`, 
        method: 'GET'
    })
}

export function updateArticleByIdAPI (data) {
    return request({
        url: '/my/article/updatearticle', 
        methor: 'POST', 
        data
    })
}

export function getArticlesBySelectAPI (data) {    
    return request({
        url: '/my/article/getArticles', 
        methor: 'GET', 
        data
    })
}