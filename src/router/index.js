import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../layout/LayoutRoot";
import LayoutPrivate from "../layout/LayoutPrivate";

import Login from "../pages/Login";
import Main from "../pages/Main";
import Index from "../pages/Index";
import GlucoseRegister from "../pages/GlucoseRegister";
import AllGlucoseRegister from "../pages/AllGlucoseRegister";
import SignUp from "../pages/SignUp";
import Files from "../pages/Files";
import MyFiles from "../pages/MyFiles";

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
        path: "/signup",
        element: <SignUp />,
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
      {
        path: "/myRecords",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <AllGlucoseRegister />,
          },
        ],
      },
      {
        path: "/files",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Files />,
          },
        ],
      },
      {
        path: "/myFiles",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <MyFiles />,
          },
        ],
      },
    ],
  },
]);
