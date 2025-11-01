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
import TicketsPaymentPage from "../pages/TicketsPaymentPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import TopUpPage from "../pages/TopUpPage";
import MidtransPaymentPage from "../pages/MidtransPaymentPage";
import TopupSuccessPage from "../pages/TopupSuccessPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import AdminMovie from "../pages/AdminMovie";
import AdminMovieDetail from "../pages/AdminMovieDetail";
import AdminMovieAdd from "../pages/AdminMovieAdd";

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
            },
            {
                path: '/tickets-payment',
                element: <TicketsPaymentPage />
            },
            {
                path: '/payment-success',
                element: <PaymentSuccessPage />
            },
            {
                path: '/topup-wallet',
                element: <TopUpPage />
            },
            {
                path: '/midtrans-payment',
                element: <MidtransPaymentPage />
            },
            {
                path: '/topup-success',
                element: <TopupSuccessPage />
            }
        ]
    },

    // dashboard
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <AdminMovie />
            },
            // detail movie admin
            {
                path: 'dashboard-movie-detail/:id',
                element: <AdminMovieDetail />
            },
            // add movie admin
            {
                path: 'dashboard-movie-add',
                element: <AdminMovieAdd />
            },
        ]
    }


])


export default router;