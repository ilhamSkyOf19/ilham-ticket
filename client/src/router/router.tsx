import { createBrowserRouter } from "react-router-dom"

import ClientLayout from "../Layouts/ClientLayout";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import SettingPage from "../pages/SettingPage";
import EWalletPage from "../pages/EWalletPage";

// router 
const router = createBrowserRouter([
    {
        path: '/signin',
        element: <SignInPage />
    },

    {
        path: '/signup',
        element: <SignUpPage />
    },


    // layout client 
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                index: true,
                element: <SettingPage />
            },
            {
                path: '/ticket',
                element: <SettingPage />
            },
            {
                path: '/wallet',
                element: <EWalletPage />
            },
            {
                path: '/setting',
                element: <SettingPage />
            }
        ]
    }
])


export default router;