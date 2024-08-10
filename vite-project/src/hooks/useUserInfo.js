import { useState, useEffect } from "react"
import { getUserInfoAPI } from "@/apis/userInfo"

function useUserInfo() {
    const [userInfoList, setUserInfoList] = useState([])
    useEffect(() => {
        const userInfo = async () => {
            const res = await getUserInfoAPI()
            setUserInfoList(res.data.data)
        }
        userInfo()
    }, [])
    return {
        userInfoList
    }
}

export { useUserInfo }