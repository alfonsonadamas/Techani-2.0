import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import UserProvider from "./context/UserContext";
import "flowbite/dist/flowbite";
import "./output.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
