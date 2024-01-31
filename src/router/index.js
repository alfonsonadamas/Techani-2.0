import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../layout/LayoutRoot";
import LayoutPrivate from "../layout/LayoutPrivate";

import Login from "../pages/Login";
import Main from "../pages/Main";
import Index from "../pages/Index";
import GlucoseRegister from "../pages/GlucoseRegister";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      { path: "/", element: <Index /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Main />,
          },
        ],
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
      {
        path: "/glucoseRegister",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <GlucoseRegister />,
          },
        ],
      },
    ],
  },
]);
