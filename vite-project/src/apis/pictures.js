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

export function deletePicAPI(data) {
    return request({
        url: '/public/cover/delete', 
        method: 'DELETE', 
        data
    })
}

export function deleteAvatarAPI(data) {
    return request({
        url: '/public/avatar/delete', 
        method: 'DELETE', 
        data
    })
}