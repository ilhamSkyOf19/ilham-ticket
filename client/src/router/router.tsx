import { createBrowserRouter } from "react-router-dom"

import ClientLayout from "../Layouts/ClientLayout";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import SettingPage from "../pages/SettingPage";
import EWalletPage from "../pages/EWalletPage";
import TicketPage from "../pages/TicketPage";
import TicketDetailPage from "../pages/TicketDetailPage";
import HomePage from "../pages/HomePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import ChooseTheaterPage from "../pages/ChooseTheaterPage";
import ChooseTimePage from "../pages/ChooseTimePage";
import ChooseSeats from "../pages/ChooseSeats";

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
        children: [
            {
                path: '/',
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
            // movie detail
            {
                path: '/movie-detail/:id',
                element: <MovieDetailPage />
            },
            // ticket detail
            {
                path: '/ticket/:id',
                element: <TicketDetailPage />
            },
            {
                path: '/choose-theater/:id',
                element: <ChooseTheaterPage />
            },
            {
                path: '/choose-times/:id',
                element: <ChooseTimePage />
            },
            {
                path: '/choose-seats',
                element: <ChooseSeats />
            }
        ]
    },


])


export default router;