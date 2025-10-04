import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import SignInPages from "../pages/SignInPages";
import SignUpPages from "../pages/SignUpPages";

// router 
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },

    {
        path: '/signin',
        element: <SignInPages />
    },

    {
        path: '/signup',
        element: <SignUpPages />
    }
])


export default router;