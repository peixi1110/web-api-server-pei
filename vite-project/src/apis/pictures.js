import { request } from "@/utils"

export  function uploadPicAPI(data){
    return request({
        
        url: '/my/picture/upload', 
        method: 'POST', 
        data
    })
}