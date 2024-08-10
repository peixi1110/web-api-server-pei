import { request } from "@/utils";

export function getCateAPI () {
    return request({
        url: '/my/article/cates', 
        method: 'GET'
    })
}