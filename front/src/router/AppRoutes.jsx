import React, { useEffect, useState } from "react";
import Cons from "../pages/Cons";
import Ptf from "../pages/Ptf";
import DetPtf from "../pages/DetPtf";
import Mvt from "../pages/Mvt";
import Log from "../pages/Log";
import Doc from "../pages/Doc";
import Quest from "../pages/Quest";
import News from "../pages/News";
import Chat from "../pages/Chat";
import Layout from "../pages/Layout";
import Error from "../pages/Error.jsx";

// ROUTE DEFINITION
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { checkAuthLoader } from "../utils/checkAuthLoader";

function AppRoutes() {
  const router = createBrowserRouter([
    { path: "/", element: <Log />, index: true }, // Log component as the main index
    { path: "/error", element: <Error /> },
    {
      path: "/layout", // or any other path you want for the Layout component
      loader: checkAuthLoader,
      element: <Layout />,
      children: [
        { path: "ptf", element: <Ptf /> },
        { path: "doc", element: <Doc /> },
        { path: "quest", element: <Quest /> },
        { path: "news", element: <News /> },
        { path: "chat", element: <Chat /> },
        { path: "detPtf", element: <DetPtf /> },
        { path: "cons", element: <Cons /> },
        { path: "mvt", element: <Mvt /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
