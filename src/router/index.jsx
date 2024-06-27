import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../layout/LayoutRoot";
import LayoutPrivate from "../layout/LayoutPrivate";
import ViewEstados from "../pages/ViewEstados";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Index from "../pages/Index";
import GlucoseRegister from "../pages/GlucoseRegister";
import AllGlucoseRegister from "../pages/AllGlucoseRegister";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Food from "../pages/Food";
import Alimentos from "../pages/Alimentos";
import Ejercicio from "../pages/Ejercicio";
import MyExercise from "../pages/MyExercise";
import NewActivity from "../pages/NewActivity";
import ViewActivity from "../pages/ViewActivity";
import Citas from "../pages/Citas";
import Estados from "../pages/Estados";

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
        path: "/viewEstados",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <ViewEstados />,
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
        path: "/profile",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: "/food",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Food />,
          },
        ],
      },
      {
        path: "/alimentos",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Alimentos />,
          },
        ],
      },
      {
        path: "/ejercicio",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Ejercicio />,
          },
        ],
      },
      {
        path: "/myExercise",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <MyExercise />,
          },
        ],
      },
      {
        path: "/newActivity",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <NewActivity />,
          },
        ],
      },
      {
        path: "/viewActivity",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <ViewActivity />,
          },
        ],
      },
      {
        path: "/citas",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Citas />,
          },
        ],
      },
      {
        path: "/estados",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Estados />,
          },
        ],
      },
    ],
  },
]);
