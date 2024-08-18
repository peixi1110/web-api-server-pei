import { request } from "@/utils";

export function getUserInfoAPI () {
    return request({
        url: '/my/userinfo', 
        method: 'GET'
    })
}

export function updateUserInfoAPI (data) {
    return request({
        url: '/my/update/userinfo', 
        method: 'POST', 
        data
    })
}

export function updatePwdAPI (data) {
    return request({
        url: '/my/update/password', 
        method: 'POST', 
        data
    })
}

export function updateAvatarAPI (data) {
    return request({
        url: '/my/update/avatar', 
        method: 'POST', 
        data
    })
}