import { request } from "@/utils";

export function getUserInfoAPI () {
    return request({
        url: '/my/userinfo', 
        method: 'GET'
    })
}