import { createBrowserRouter } from "react-router-dom";

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
import { CheckAuth } from "../hooks/useCheckAuth";
import AdminMoviePage from "../pages/AdminMoviePage";
import AdminMovieDetailPage from "../pages/AdminMovieDetailPage";
import AdminMovieAddPage from "../pages/AdminMovieAddPage";
import { useReadTheater, useReadTheaterDetail } from "../hooks/useTheater";
import AdminTheaterAddPage from "../pages/AdminTheaterAddPage";
import AdminListTheaterPage from "../pages/AdminListTheaterPage";
import { useReadGenre } from "../hooks/useGenre";
import { useReadMovie, useReadMovieDetail } from "../hooks/useMovie";
import AdminListBonusPage from "../pages/AdminListBonusPage";
import { useReadBonus, useReadBonusDetail } from "../hooks/useBonus";
import AdminBonusAddPage from "../pages/AdminBonusAddPage";
import AdminListGenrePage from "../pages/AdminListGenrePage";
import AdminGenreAddPage from "../pages/AdminGenreAddPage";

// router
const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignInPage />,
  },

  {
    path: "/signup",
    element: <SignUpPage />,
  },

  // layout client
  {
    path: "/",
    loader: async () => await CheckAuth.useCheckAuth("customer"),
    children: [
      {
        path: "/",
        element: <ClientLayout />,
        children: [
          {
            index: true,
            loader: async () => {
              const [user, movies, genres] = await Promise.all([
                CheckAuth.useCustomer(),
                useReadMovie(),
                useReadGenre(),
              ]);

              // return
              return { user, movies, genres };
            },
            element: <HomePage />,
          },
          {
            path: "/ticket",
            element: <TicketPage />,
          },
          {
            path: "/wallet",
            element: <EWalletPage />,
          },
          {
            path: "/setting",
            loader: async () => {
              return await CheckAuth.useCustomer();
            },
            element: <SettingPage />,
          },
        ],
      },
      // movie detail
      {
        path: "/movie-detail/:id",
        loader: async ({ params }) => {
          return await useReadMovieDetail(+params.id!);
        },
        element: <MovieDetailPage />,
      },
      // ticket detail
      {
        path: "/ticket/:id",
        element: <TicketDetailPage />,
      },
      {
        path: "/choose-theater/:id",
        loader: async ({ params }) => {
          return await useReadMovieDetail(Number(params.id));
        },
        element: <ChooseTheaterPage />,
      },
      {
        path: "/choose-times/:id",
        loader: async ({ params }) => {
          return await useReadMovieDetail(Number(params.id));
        },
        element: <ChooseTimePage />,
      },
      {
        path: "/choose-seats",
        element: <ChooseSeats />,
      },
      {
        path: "/tickets-payment",
        element: <TicketsPaymentPage />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccessPage />,
      },
      {
        path: "/topup-wallet",
        element: <TopUpPage />,
      },
      {
        path: "/midtrans-payment",
        element: <MidtransPaymentPage />,
      },
      {
        path: "/topup-success",
        element: <TopupSuccessPage />,
      },
    ],
  },

  // dashboard
  {
    path: "/dashboard",
    loader: async () => {
      return await CheckAuth.useCheckAuth("admin");
    },
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        loader: async () => {
          return await useReadMovie();
        },
        element: <AdminMoviePage />,
      },
      // detail movie admin
      {
        path: "dashboard-movie-detail/:id",
        loader: async ({ params }) => {
          return await useReadMovieDetail(Number(params.id));
        },
        element: <AdminMovieDetailPage />,
      },
      // add movie admin
      {
        path: "dashboard-movie-add",
        loader: async () => {
          const [theaters, genres, bonus] = await Promise.all([
            useReadTheater(),
            useReadGenre(),
            useReadBonus(),
          ]);

          return { theaters, genres, bonus };
        },
        element: <AdminMovieAddPage />,
      },
      {
        path: "dashboard-movie-detail/:id/update",
        loader: async ({ params }) => {
          const [theaters, genres, bonus, movie] = await Promise.all([
            useReadTheater(),
            useReadGenre(),
            useReadBonus(),
            useReadMovieDetail(Number(params.id)),
          ]);

          return { theaters, genres, bonus, movie };
        },
        element: <AdminMovieAddPage />,
      },

      // list theater admin
      {
        path: "theater",
        loader: async () => {
          return await useReadTheater();
        },
        element: <AdminListTheaterPage />,
      },

      // add theater admin
      {
        path: "dashboard-theater-add",
        element: <AdminTheaterAddPage />,
      },

      // update theater admin
      {
        path: "dashboard-theater-update/:id",
        loader: async ({ params }) => {
          return await useReadTheaterDetail(Number(params.id));
        },
        element: <AdminTheaterAddPage />,
      },

      // list bonus admin
      {
        path: "bonus",
        loader: async () => {
          return await useReadBonus();
        },
        element: <AdminListBonusPage />,
      },

      // add bonus admin
      {
        path: "dashboard-bonus-add",
        element: <AdminBonusAddPage />,
      },

      // add bonus admin
      {
        path: "dashboard-bonus-update/:id",
        loader: async ({ params }) => {
          return await useReadBonusDetail(Number(params.id));
        },
        element: <AdminBonusAddPage />,
      },

      // list genre admin
      {
        path: "genre",
        loader: async () => {
          return await useReadGenre();
        },
        element: <AdminListGenrePage />,
      },

      // add genre admin
      {
        path: "dashboard-genre-add",
        element: <AdminGenreAddPage />,
      },
    ],
  },
]);

export default router;
