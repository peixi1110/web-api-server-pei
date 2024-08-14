import { request } from "@/utils"

export function uploadPicAPI(data) {
    return request({
        url: '/public/cover',
        method: 'POST',
        data
    })
}

export function uploadAvatarAPI(data) {
    return request({
        url: '/public/avatar',
        method: 'POST',
        data
    })
}