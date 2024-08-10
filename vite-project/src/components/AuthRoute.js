// if 'token'  -->  next page
// if no 'token'  -->  back to login page

import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"


export function AuthRoute ({ children }) {
    const token = getToken()
    if (token) {
        return (
            <>{children}</>
        )
    } else {
        return (
            <Navigate to={'/login'} replace />
        )
    }
}
