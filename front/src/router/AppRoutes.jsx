import React, { useEffect, useState } from "react";
import Cons from "../pages/Cons";
import Ptf from "../pages/Ptf";
import DetPtf from "../pages/DetPtf";
import Mvt from "../pages/Mvt";
import Log from "../pages/Log";
import Doc from "../pages/Doc";
import Quest from "../pages/Quest";
import News from "../pages/NewsPosts.jsx";
import Chat from "../pages/Chat";
import Layout from "../pages/Layout";
import Error from "../pages/Error.jsx";
import PdfView from "../pages/PdfView.jsx";
import NewsLayout from "../pages/NewsLayout.jsx";
import AdminLayout from "../pages/Admin/AdminLayout.jsx";
import Home from "../pages/Admin/Home.jsx";
import NewsConfig from "../pages/Admin/NewsConfig.jsx";
import CollConfig from "../pages/Admin/CollConfig.jsx";
import ChatConfig from "../pages/Admin/ChatConfig.jsx";

// ROUTE DEFINITION
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { checkAuthLoader } from "../utils/checkAuthLoader";

function AppRoutes() {
  const router = createBrowserRouter([
    { path: "/", element: <Log />, index: true }, // Log component as the main index
    { path: "/error", element: <Error /> },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "newsConfig", element: <NewsConfig /> },
        { path: "chatConfig", element: <ChatConfig /> },
        { path: "collConfig", element: <CollConfig /> },
      ],
    },

    {
      path: "/layout", // or any other path you want for the Layout component
      loader: checkAuthLoader,
      element: <Layout />,
      children: [
        { path: "ptf", element: <Ptf /> },
        { path: "doc", element: <Doc /> },
        { path: "quest", element: <Quest /> },
        {
          path: "news",
          element: <NewsLayout />,
          children: [
            { path: "posts", element: <News /> },
            { path: ":viewpdf", element: <PdfView /> },
          ],
        },
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
