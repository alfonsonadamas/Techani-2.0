import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../layout/LayoutRoot";
import LayoutPrivate from "../layout/LayoutPrivate";

import Login from "../pages/Login";
import Main from "../pages/Main";
import Index from "../pages/Index";
import GlucoseRegister from "../pages/GlucoseRegister";
import AllGlucoseRegister from "../pages/AllGlucoseRegister";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Food from "../pages/Food";
import Alimentos from "../pages/Alimentos";
import Exercise from "../pages/Exercise";
import Citas from "../pages/Citas";
import Estados from "../pages/Estados";
import Activities from "../pages/Activities";
import GlucoseRegisterMain from "../pages/DailyRecord";
import InsulineRegister from "../pages/InsulineRegister";
import WaterRegister from "../pages/WaterRegister";
import AtipicDay from "../pages/AtipicDayRegister";

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
        path: "/exercise",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Exercise />,
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
      {
        path: "/newActivitie",
        children: [
          {
            index: true,
            element: <Activities />,
          },
        ],
      },
      {
        path: "/dailyRecord",
        children: [
          {
            index: true,
            element: <GlucoseRegisterMain />,
          },
        ],
      },
      {
        path: "/insulineRegister",
        children: [
          {
            index: true,
            element: <InsulineRegister />,
          },
        ],
      },
      {
        path: "/waterRegister",
        children: [
          {
            index: true,
            element: <WaterRegister />,
          },
        ],
      },
      {
        path: "/atipicDayRegister",
        children: [
          {
            index: true,
            element: <AtipicDay />,
          },
        ],
      },
    ],
  },
]);