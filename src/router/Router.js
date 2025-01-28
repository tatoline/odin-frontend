    import React from "react";
    import Auth from "../views/Auth/Auth";
    import Register from "../views/Auth/Register/Register";
    import SignIn from "../views/Auth/SignIn/SignIn";
    import Home from "../views/Home/Home";
    import Settings from "../views/Settings/Settings";
    import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
    import AuthLayout from "../layouts/Auth/AuthLayout"
    import MainLayout from "../layouts/Main/MainLayout";

    export const AppRoutes = [
        {
            key: 'home',
            component: <Home />,
            path: '/',
            protect: true
        },
        {
            key: 'settings',
            component: <Settings />,
            path: '/settings',
            protect: true
        },
        {
            key: 'auth',
            component: <Auth />,
            path: '/auth',
            protect: false,
            children: [
                {
                    key: 'sign-in',
                    component: <SignIn />,
                    path: 'sign-in',
                    protect: false
                },
                {
                    key: 'register',
                    component: <Register />,
                    path: 'register',
                    protect: false
                }
            ]
        },
    ]

    const renderComponent = (item, isSub) => {
        const protection = item.protect

        if(protection === false) {
            if(item.children || isSub) {
                return <AuthLayout>{item.component}</AuthLayout>
            }
            return <>{item.component}</>
        }

        if(item.children || isSub === false) {
            return <MainLayout>{item.component}</MainLayout>
        }

        return(item.component)
    }

    // Generate routes dynamically
    const routes = AppRoutes.map((item) => ({
        path: item.path,
        element: renderComponent(item, false),
        children: item.children?.map((subItem) => ({
            path: subItem.path,
            element: renderComponent(subItem, true)
        }))
    }))

    // Create the browser router
    export const router = createBrowserRouter(routes, {
        future: {
            v7_startTransition: true, // Enables React.startTransition for state updates
            v7_relativeSplatPath: true // Enables new relative path resolution for splat (*) routes
        }
    })

    const AppRouter = () => {
        return <RouterProvider router={router} />
    }

    export default AppRouter