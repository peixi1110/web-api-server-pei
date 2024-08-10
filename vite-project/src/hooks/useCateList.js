import { useState, useEffect } from "react"
import { getCateAPI } from "@/apis/cate"

function useCate() {
    const [cateList, setCateList] = useState([])
    useEffect(() => {
        const getCateList = async () => {
            const res = await getCateAPI()
            setCateList(res.data.data)
        }
        getCateList()
    }, [])
    return {
        cateList
    }
}


export { useCate }