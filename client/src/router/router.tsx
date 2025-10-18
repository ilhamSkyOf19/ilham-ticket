import { createBrowserRouter } from "react-router-dom"

import ClientLayout from "../Layouts/ClientLayout";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import SettingPage from "../pages/SettingPage";
import EWalletPage from "../pages/EWalletPage";
import TicketPage from "../pages/TicketPage";
import TicketDetailPage from "../pages/TicketDetailPage";
import HomePage from "../pages/HomePage";

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
                element: <HomePage />
            },
            {
                path: '/ticket',
                element: <TicketPage />
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
    },

    // ticket detail
    {
        path: '/ticket/:id',
        element: <TicketDetailPage />
    }
])


export default router;