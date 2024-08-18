import { createSlice } from "@reduxjs/toolkit";
import { removeToken } from "@/utils";
import { setToekn as _setToken, getToken } from "@/utils";
import { loginAPI } from '@/apis/user'
import { getUserInfoAPI } from '@/apis/userInfo'
import { message } from "antd";

const userStore = createSlice ({
    name: "user", 
    // data state
    initialState:{
        token: getToken() || '', 
        userInfo: {}
    }, 
    // synchronous modification method
    reducers: {
        setToken (state, action) {
            state.token = action.payload
            // localstorage
            _setToken (action.payload)
        },
        setUserInfo (state, action) {
            state.userInfo = action.payload
        }, 
        clearUserInfo (state) {
            state.token = '' 
            state.userInfo = {} 
            removeToken() 
        }
    }
})

// actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// get reducer function 
const userReducer = userStore.reducer

// asynchronous modification method  -->  get token after login 
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // send asynchronous request
        // const res = await request.post('/authorizations', loginForm)
        const res = await loginAPI(loginForm)
        if (res.data.status ===0) {
        // submit synchronous action to store token
            dispatch(setToken(res.data.token))
            message.success('Login successful!')
        } else {
            message.error('Wrong username or password.')
        }
    }
}

// get userInfo
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getUserInfoAPI()
        dispatch(setUserInfo(res.data))
    }
}



// on demand
export { fetchLogin, fetchUserInfo, clearUserInfo, setToken }

// be combined in index.js
export default userReducer