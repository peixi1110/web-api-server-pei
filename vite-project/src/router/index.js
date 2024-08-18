// set router 
import Layout from "@/pages/Layout";  // "src/pages/Layout"
import Login from "@/pages/Login";  // "src/pages/Login"
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import Home from "@/pages/Home";
import Edit from "@/pages/Edit"
import ChangePsw from "@/pages/ChangePsw"

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute"


const router = createBrowserRouter([
    {
        path: '/', 
        element: <AuthRoute><Layout /></AuthRoute>, 
        children: [
            {
                path: '', 
                element: <Home />,
            }, 
            {
                path: 'editinfo', 
                element: <Edit />
            }, 
            {
                path: 'changepsw', 
                element: <ChangePsw />
            }, 
            {
                path: 'article', 
                element: <Article />
            },
            {
                path: 'publish', 
                element: <Publish />
            },
        ]
    }, 
    {
        path: 'login', 
        element: <Login />
    }
])


export default router