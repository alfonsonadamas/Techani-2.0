import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../layout/LayoutRoot";
import LayoutPrivate from "../layout/LayoutPrivate";
import ViewEstados from "../pages/ViewEstados";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Index from "../pages/Index";
import GlucoseRegister from "../pages/GlucoseRegister";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Food from "../pages/Food";
import Alimentos from "../pages/Alimentos";
import AlimentosRegister from "../pages/AlimentosRegister";
import AllAlimentosRegister from "../pages/AllAlimentosRegister";
import AllFoodsRegister from "../pages/AllFoodsRegister";

import Exercise from "../pages/Exercise";
import NewActivity from "../pages/NewActivity";
import ViewActivity from "../pages/ViewActivity";
import Citas from "../pages/Citas";
import Estados from "../pages/Estados";
import Activities from "../pages/Activities";
import GlucoseRegisterMain from "../pages/DailyRecord";
import InsulineRegister from "../pages/InsulineRegister";
import WaterRegister from "../pages/WaterRegister";
import AtipicDay from "../pages/AtipicDayRegister";
import Files from "../pages/Files";
import MyDates from "../pages/MyDates";
import Grapics from "../pages/Graphics";
import MyExercise from "../pages/MyExercise";
import MyFiles from "../pages/MyFiles";
import Pagina1Registro from "../pages/Pagina1Registro";
import SleepHours from "../pages/SleepHours";
import MyGlucoseRegister from "../pages/MyGlucoseRegister";
import EditRecords from "../pages/EditRecords";
import Expediente from "../pages/Expediente";

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
        path: "/editRecords",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <EditRecords />,
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
            element: <MyGlucoseRegister />,
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
        path: "/AlimentosRegister",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <AlimentosRegister />,
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
        path: "/myAliments",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <AllAlimentosRegister />,
          },
        ],
      },
      {
        path: "/myFoods",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <AllFoodsRegister />,
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
        path: "/myDates",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <MyDates />,
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
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Activities />,
          },
        ],
      },
      {
        path: "/dailyRecord",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <GlucoseRegisterMain />,
          },
        ],
      },
      {
        path: "/insulineRegister",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <InsulineRegister />,
          },
        ],
      },
      {
        path: "/waterRegister",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <WaterRegister />,
          },
        ],
      },
      {
        path: "/atipicDayRegister",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <AtipicDay />,
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
        path: "/graphics",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Grapics />,
          },
        ],
      },
      {
        path: "/registroTemp",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Pagina1Registro />,
          },
        ],
      },
      {
        path: "/sleep",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <SleepHours />,
          },
        ],
      },
      {
        path: "/myRecord",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Expediente />,
          },
        ],
      },
    ],
  },
]);
