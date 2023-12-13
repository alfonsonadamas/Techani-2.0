import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../layout/LayoutRoot";
import LayoutPrivate from "../layout/LayoutPrivate";

import Login from "../pages/Login";
import Main from "../pages/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      { path: "/", element: <h1>Home</h1> },
      { path: "/about", element: <h1>About</h1> },
      { path: "/contact", element: <h1>Contact</h1> },
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
    ],
  },
]);
