import React from "react";
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

//UTILS
import { checkAuthLoader } from "../utils/checkAuthLoader.jsx";

// ROUTE DEFINITION
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function AppRoutes() {
  const router = createBrowserRouter([
    { path: "/", element: <Log />, index: true }, // Log component as the main index
    { path: "/error", element: <Error />, loader: checkAuthLoader },
    {
      path: "/layout", // or any other path you want for the Layout component
      element: <Layout />,
      children: [
        { path: "ptf", element: <Ptf />, loader: checkAuthLoader },
        { path: "doc", element: <Doc />, loader: checkAuthLoader },
        { path: "quest", element: <Quest />, loader: checkAuthLoader },
        { path: "news", element: <News />, loader: checkAuthLoader },
        { path: "chat", element: <Chat />, loader: checkAuthLoader },
        { path: "detPtf", element: <DetPtf />, loader: checkAuthLoader },
        { path: "cons", element: <Cons />, loader: checkAuthLoader },
        { path: "mvt", element: <Mvt />, loader: checkAuthLoader },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
