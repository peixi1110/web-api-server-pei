import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute"

// set router 
import Layout from "@/pages/Layout";  // === "src/pages/Layout"
import Login from "@/pages/Login";  // === "src/pages/Login"
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";
// import Home from "@/pages/Home";
// import Edit from "@/pages/Edit"
// import ChangePsw from "@/pages/ChangePsw"

// Routing lazy loading ...
import { lazy, Suspense } from "react";
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))
const Edit = lazy(() => import('@/pages/Edit'))
const ChangePsw = lazy(() => import('@/pages/ChangePsw'))


const router = createBrowserRouter([
    {
        path: '/', 
        element: <AuthRoute><Layout /></AuthRoute>, 
        children: [
            {
                path: '', 
                // element: <Home />,
                element: <Suspense fallback={'Loading...'}><Home /></Suspense>
            }, 
            {
                path: 'editinfo', 
                // element: <Edit />
                element: <Suspense fallback={'Loading...'}><Edit /></Suspense>
            }, 
            {
                path: 'changepsw', 
                // element: <ChangePsw />
                element: <Suspense fallback={'Loading...'}><ChangePsw /></Suspense>
            }, 
            {
                path: 'article', 
                // element: <Article />
                element: <Suspense fallback={'Loading...'}><Article /></Suspense>

            },
            {
                path: 'publish', 
                // element: <Publish />
                element: <Suspense fallback={'Loading...'}><Publish /></Suspense>

            },
        ]
    }, 
    {
        path: 'login', 
        element: <Login />
    }
])


export default router