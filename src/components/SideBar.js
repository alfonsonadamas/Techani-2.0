import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import Logo from "../assets/img/Techani (1).png";
import { useUserContext } from "../context/UserContext";

export default function SideBar() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isHidden, setIsHidden] = useState(true);
  const [name, setName] = useState("");

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      navigate("/login");
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  const dropDown = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    if (user) {
      setName(user.user_metadata.full_name);
    }
  }, [user]);
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Link to={"/dashboard"} className="flex ms-2 md:me-24">
                <img src={Logo} alt="techanilogo" className="h-10 me-3" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Techani
                </span>
              </Link>
              <h2 className="hidden sm:block">Bienvenido, {name}</h2>
            </div>
          </div>
        </div>
      </nav>
      <div className="sidebar fixed top-14 bottom-0 lg:left-0 left-[-300px] p-2 w-[250px] overflow-y-auto text-center border-r border-gray-200">
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
          <svg
            className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <div
            className="flex justify-between w-full items-center"
            onClick={dropDown}
          >
            <span className="text-[15px] ml-2 font-semibold">
              Registro Diario
            </span>
            <span
              className={
                isHidden
                  ? "text-sm duration-300"
                  : "text-sm rotate-180 duration-300 "
              }
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </span>
          </div>
        </div>

        <div
          className={
            isHidden
              ? "hidden text-left text-sm  mt-2 w-4/5 mx-auto"
              : " text-left text-sm  mt-2 w-4/5 mx-auto"
          }
        >
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link
              to={"/glucoseRegister"}
              className="flex items-center cursor-pointer p-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span className="ml-3">Nuevo Registro</span>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link className="flex cursor-pointer p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                />
              </svg>

              <span className="ml-3">Ver Registros</span>
            </Link>
          </div>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>

          <div
            className="flex justify-between w-full items-center"
            onClick={handleSignOut}
          >
            <span className="text-[15px] ml-2 font-semibold">
              Cerrar Sesión
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
