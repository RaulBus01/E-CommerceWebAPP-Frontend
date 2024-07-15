import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import X from "./pages/x/x";
import Y from "./pages/y/y";
import Z from "./pages/z/z";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "x",
    element: <X />,
  },

  {
    path: "y",
    element: <Y />,
  },

  {
    path: "z",
    element: <Z />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
