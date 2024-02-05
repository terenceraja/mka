import React from "react";
import Cons from "../pages/Cons";
import Ptf from "../pages/Ptf";
import DetPtf from "../pages/DetPtf";
import Mvt from "../pages/Mvt";
import Log from "../pages/Log";
import Layout from "../pages/Layout";

// ROUTE DEFINITION
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function AppRoutes() {
  const router = createBrowserRouter([
    { path: "/", element: <Log />, index: true }, // Log component as the main index
    {
      path: "/layout", // or any other path you want for the Layout component
      element: <Layout />,
      children: [
        { path: "ptf", element: <Ptf /> },
        { path: "detPtf", element: <DetPtf /> },
        { path: "cons", element: <Cons /> },
        { path: "mvt", element: <Mvt /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
