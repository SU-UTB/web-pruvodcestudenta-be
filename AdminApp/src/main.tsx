import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/ErrorPage";
import Sections from "./pages/Admin/Sections";
import Topics from "./pages/Admin/Topics";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/sections",
        element: <Sections />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/topics",
        element: <Topics />,
        errorElement: <ErrorPage />,
    },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
