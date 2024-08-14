// request about users
import Login from "@/pages/Login";
import { request } from "@/utils";

export function loginAPI (formData) {
    console.log('Login successful')
    return request({
        url: '/api/login', 
        method: 'POST', 
        data: formData
    })
}
