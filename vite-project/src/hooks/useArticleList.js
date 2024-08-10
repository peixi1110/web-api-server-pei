import { useState, useEffect } from "react"
import { getArticleListAPI } from "@/apis/article"

function useArticleList() {
    const [articleList, setArticleList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        const getArticleList = async () => {
            const res = await getArticleListAPI()
            setArticleList(res.data.data)
            setCount(res.data.total)
        }
        getArticleList()
    }, [])
    return {
        articleList, 
        count
    }
}

export { useArticleList }