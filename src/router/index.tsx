import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Exercise from "@/pages/Exercise";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/exercise",
        element: <Exercise />
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router
