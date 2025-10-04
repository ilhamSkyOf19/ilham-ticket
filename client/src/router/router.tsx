import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import SignInPages from "../pages/SignInPages";

// router 
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },

    {
        path: '/signin',
        element: <SignInPages />
    }
])


export default router;