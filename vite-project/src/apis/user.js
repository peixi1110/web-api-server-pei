// request about users
import Login from "@/pages/Login";
import { request } from "@/utils";

export function loginAPI (formData) {
    return request({
        url: '/api/login', 
        method: 'POST', 
        data: formData
    })
}
