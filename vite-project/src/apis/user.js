// request about users
import { request } from "@/utils";

export function loginAPI (formData) {
    return request({
        url: '/api/login', 
        method: 'POST', 
        data: formData
    })
}
