import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/img/Techani (1).png";
import { useUserContext } from "../context/UserContext";

export default function SideBar() {
  const { user } = useUserContext();
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const [isHidden3, setIsHidden3] = useState(true);
  const [isHidden4, setIsHidden4] = useState(true);
  const [isHidden5, setIsHidden5] = useState(true);
  const [isHidden6, setIsHidden6] = useState(true);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  const dropDown = () => {
    setIsHidden(!isHidden);
  };

  const dropDown2 = () => {
    setIsHidden2(!isHidden2);
  };

  const dropDown3 = () => {
    setIsHidden3(!isHidden3);
  };

  const dropDown4 = () => {
    setIsHidden4(!isHidden4);
  };

  const dropDown5 = () => {
    setIsHidden5(!isHidden5);
  };

  const dropDown6 = () => {
    setIsHidden6(!isHidden6);
  };

  useEffect(() => {
    if (user) {
      if (user.user_metadata.avatar_url) {
        if (user.app_metadata.provider === "facebook") {
          return setPicture(
            "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
          );
        }
        setPicture(user.user_metadata.avatar_url);
      } else {
        setPicture(
          "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
        );
      }
      console.log();
      setName(user.user_metadata.full_name);
      console.log(name);
    }
  }, [user, name]);

  const [responsive,setResponsive]=useState(false);
  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setResponsive(false);
      } else {
        setResponsive(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toogleResponsive = () =>{
    setResponsive(!responsive);

  };

  
  return (
    <div className="bg-white py-3 fixed top-0 left-0 right-0 shadow-md">
    
            <div className=" flex items-center justify-between">
              <div className="  flex items-center justify-start rtl:justify-end">

                <button className="ml-5" onClick={toogleResponsive}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>


                <div className="ml-5">
                <Link to={"/dashboard"} className="flex ms-2 md:me-24">
                  <img src={Logo} alt="techanilogo" className="h-10 me-3" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    Techani
                  </span>
                </Link>
                </div>

                <h2 className="hidden sm:block">Bienvenido, {name}</h2>
              </div>

              <div className="mr-5">
                <Link to={"/profile"}>
                  <img
                    className="rounded-full"
                    src={picture}
                    alt="perfil"
                    width={40}
                  />
                </Link>

              </div>

              
            </div>

          


          <div style={{backgroundColor: '#ffff',border: '2px solid #E5E5E5', minHeight: '100vh', width: '15rem', position: 'fixed', top: 0, left: 0 }} className={`${responsive ? "hidden" : "flex"}`} >
            <div style={{paddingTop:'3px'}}>

                <div className="  flex items-center justify-start rtl:justify-end">

                  <div className=" md:hidden">
                    <button style={{margin:'10px'}} onClick={toogleResponsive}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </button>
                  </div>

                
                
                <div className="ml-5 mt-3">
                  <Link to={"/dashboard"} className="flex ms-2 md:me-24">
                    <img src={Logo} alt="techanilogo" className="h-10 me-3" />
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                      Techani
                    </span>
                  </Link>
                </div>
                </div>
                

             
             
             
                {/*SIDE BAR */}
      <div className={`${responsive ? "hidden" : "block"} fixed top-14 bottom-0 p-2 w-[275px] overflow-y-auto text-center`}>
        {/* Aqui empieza el menu desplegable */}

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
              to={"/dailyRecord"}
              className="flex items-center cursor-pointer p-2 "
            >
              <img
                alt="diabetes"
                className="h-5 w-5"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEuklEQVR4nO2ZW4hWVRTH/1BqNhlYZplFpkFNlGXBGNnFHiwqtNAKagzMfIiKUB9KxTDCySeNiq5SWI3dQa1Au2gX6iHLtAcviZeCoiiagZq8MNoXC34bNtt9znc8+3xfE8wf9sNae+211tn7nLXXWkc6OgyW1CapXdIcScskdUr6TNJ2SbsZXYweSTVGj8d3cttZ24muOehuw1alOE3SPElfS+r1HGv06MXmPHxIwg2S/gqUb5G0kh2cyw5OlNQqaTRjKKPF09Xi8Z1cK2vb0bVM0mvY8DfNfLg+5UF+RNFaSTc14rhzMBiba/Fhb4qygygZpP8Og/DBfCmN31ByCvS1kvY34fs4wGstbNfwpTR2oeQc6PlN/NjnY3MMtPlSGt+iZBz0fdDPqHF4Fhv3Ql8CvSlF6acoschiuBPa4n6jsBIb06EnQn+SovRdlEyBngL9nhqH97ExObC5JkXpq8HuXA1tt3FRTGBdUXyOjauCt+AVJeBplNi3YbgY2i6sotjAKIot2DBb4lup4UtpLAkiyGjoPQXXX+5FIbfD9bAX+bODSPmYEhAqGQb9R8H1H3oP8kHBNV3InxxspuVcpREe6wAv56qH8ci6jLcGrx56kTVb/uvtwnEpTEeJffQOf8PzE8K8iPcIowYvDy3ImY2sgFMKkyMO/AJvRM46ywQOU4OcxOiB57KEGEag22w4rAnCcSnELqPv4Z2bs+5xZJ7zeM/Ds1Q9C+chsyNyKR9NCD8C41BiqYrDV/CsiovheEndyIz1+GPhdSMTQxsyZsNhU5AmlUIsYfsI3qSMNbcwvzEyt5G5aRlrJzFvNsLE1XwpjWGRFPqdOs48xXxHZK6DuScy1k5j3myEpYT5UhoDI0XNS/BmZqx5g/kZkbkZzL2esXYm82bD4QA88yUJrpA6LviQZ2fIP8r825E5d5oWjmOYzbzZ8KtD8yEZv6JsOLS7ExZlyI/xSuSlkkZKOoNo5ao/l36EWBQ86HBo8yEZO4Mqca7nZBbulnQoUvUZ766cdUuRMxvCZg0fkvENyqxSM8yCXl5nnSWJ62jl/Ek35Io6a5aj22z41aH5kIwNQZV4G/Sbqh5voftW6Gug11ehfDXKrMdkuA7adrtqrEO3dWuETaNXVaH8ZZRZpWa4rIIOSb0xPqgOV1TxIE8GVeIJXgBoxNiJDb9rYz4koyOoEpuJBdheXIWyh1BmlVqzsQTbD1ah7J6Mppx10H/PeUX2BflWOyVylryF6fCSddWh+ZCMOzKactsKvvNnIp/30G4cljTEs9EJ33xIxo0ZZerH8G/OWLcjaOtsDWgfo7xa5ZhIuWw+JONKlFml5mNhgR3e5/1tWl9AflVgw1WH5kMyLkLZ5oA/lErunwynfvIuNnf/7Ml5CCug7A9WrIluPiRjlNcQuFDSsWoOzpL0M7bNh2QM9PpSLg3fTJvGao8HJN1OXnQB3cjTObETPT1D4J2KzPkkllOJSg9LekHSF4G9riqKKodWwu8uIksj05Oa92quCBoYlcI6IJfSMFtANddJw+A7/p//wE52B/dEF3fJbqLal/StXuTyu5+TtT5YPxoFdyL/e9T6H6SPof9E+hr6T6SvoSkn8i+tVmOCXUbm9QAAAABJRU5ErkJggg=="
              />

              <span className="ml-3">Nuevo Registro</span>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link to={"/myRecords"} className="flex cursor-pointer p-2 ">
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

              <span className="ml-3">Mis Registros</span>
            </Link>
          </div>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
          <img
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            alt="bread"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACl0lEQVR4nO2ZPWgUQRiGHy3UIAjiL/6gJhiMraAWCgZ/CkHEwsbGxlRWVmohEvSCtSL+IJhEUygqiilFUEljoYWtikZtJARjNDkVszLwHiyX3buZ3dvdO5kHprnvnfnm3Zn9ZvcWPB6PJ8RCYCdwHLgA3AaeAa+Ad8AYMA78AQKHVlY/095rvKfAANALHAW6gDmkYANwBnidYIKNbmPAENDtYmojMAzMhAYyRt4AgzLXAxwCXlQl/AD0A6eAw8B2YBOwElgMzKvKNVe/LwHagS3APuAYcA64B3ypymHmsaOeiT3AhDpMaon3Am0R2gHpfgPXgc1kRztwFhgN5TwSJ16nyRvhQ2BVjYEPSPcd2E1+tAGXQveXuX9mcVWCIYt9+FjakxTDoPLfjAp+VLDTYqCv0nZQDB3K/ykqWFaw+oaM4pe0CyiG+co/HRX8rOBqi4Eqq2dKdBwjqmpJGKnTt0v530YF7yp4wiLRLWnNoRWHmchzi7GS9L2s/Neigt06O0zl2lUn0Vbgr7bYfvKlR/Oc1hkVyUU5nQK21RmwN1QGzcGXBwd1AWdkKBZTdm9ogk8sBr7ioG0EL5XvtI14qcQ/LbTLHLQV+oAfQAl3ysq3yLZD5bmm0VpCTw/mqcCVwDFXpkZKMnPeZULNaCQNgTdSwIr01SgGLbUikzWKQSFGkpbZUo1iUIiRNGU2jkKMpCmzcbTUPVILbySLq5TmhStopq2V5oUraCYjaQi8kRxXxOYAbYkVsTlAczeSpDLZHKC5G0lTmWj1rZVJrv/GyIQ6rLHQjku7gmxZqzxmbtbcV6dhCzMPpO13+ZvGkeXAI+UxX7Gs6dR3u6DJ2jdgvetVMP/K3wltsyLblHaH+QTn8Xg8tD7/AABpnIkAC+4xAAAAAElFTkSuQmCC"
          ></img>

          <div
            className="flex justify-between w-full items-center"
            onClick={dropDown2}
          >
            <span className="text-[15px] ml-2 font-semibold">Alimentos</span>
            <span
              className={
                isHidden2
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
            isHidden2
              ? "hidden text-left text-sm  mt-2 w-4/5 mx-auto"
              : " text-left text-sm  mt-2 w-4/5 mx-auto"
          }
        >
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link
              to={"/alimentos"}
              className="flex items-center cursor-pointer p-2 "
            >
              <img
                className="h-5 w-5"
                alt="food"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADeElEQVR4nO2ZW4hNYRTHfzPut0GU5IEiJXlwSUgiCUXJ5WGIMB5EyLgmD5JSyoxbPCkvPLiWkDxIBpEH5VIIY3LNtUHuZmvVf2u122cMztmzd+Zfq85Za+2v9e1vff+11jnQhCb8d+gIXJGUkGEcAALJITKKmdrAe0kgXabQCnio4MuA+fr8ULbMYLECvw4US65Lt4gMoUpBz3K6WdKdJ0N4q6C7Ol1X6d6QYgwCXgMX9ea/Keg2zqetdF+BUvk+AwaSIhxxNBs4Gex8hubwSRUthwxVAdx1QVodCXHQ6R8A2/S5mhThk4Ky9GkGbNT3OmAZUO6+bwCau1SzZ1OD5wqqu9OtjUkj04XoLp3dk9TR7VSns5N57DZRo3oSYloa6Xihgrocqdy73Ua2O30r+QZ6NjUY5QI+DLSPbNBkgXTt5RPq7dnU0m+N2pTtTlchXU0W6LcSuJ+jXgRZo9/moti6mA1kkn7XpYV+i4DpwFngA/ASOA1MSSP9DgJ2ALcU7AvgjJo6zyxROa55vNHptwTYnyOPvdQCy4EeSoVyN7Zeakz67QSsdBT4AzgKjAHaKeAyMUmgk+oWWaOfpj37ZSRx+i0BNit9/CKflKtRdNbdCMfVDmmg3wnAU0d/dgcmAis0ANmpzIl5zoaicw18awWl3yKdQp3LaRtuiJmjbbEhMWt0ET0GOU6u4PTbDNgrxy/A6gj1eYRHfC2Hz2TZn7pLnBj9bpaTMcy4+hyB1u5yx6WY4ZTsNiTFoSD0O0F5b0P+SBqGMMVu5LCPlf1ODnve6bele7vG+Q2FXb6rkdrgUSy7pVAc8k6/pTLeq+dOFAJ5p98jMi4lWeSdfh/J2CfhjTzLN/1+lbEFyeLiP9DvhbgFP8polJok1v4D/a6JW/C2jNaeJwlr6Z/8Bf0+jowDv1Aph10kj+HAuz+gXxsRhuVarK9aEmsGx5M8+qsW/Y5+L8m3XqyXs92XeSSPYmAGcBJ45YK3zydka1CNK4ocqbXik8TdjYFA8teYrRk8cN3rFvViNjhlZiPhaLveMYqvsLfFHlvVCUxWkzkA6KnNdlY98LQZ6nsBvYERqh9LgE3APmBVvjcSwoIZrROpcvWmUFKrFM/7RqJoob/FSlXM9ugiGpvcFEW+kXx3wXx2+mo1iPbMMWCnTn+ufqAIUZW2vw6a8N/hJ34gD/Zl2MhwAAAAAElFTkSuQmCC"
              />

              <span className="ml-3">Registrar Comida</span>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link
              to={"/AlimentosRegister"}
              className="flex items-center cursor-pointer p-2 "
            >
              <img
                className="h-5 w-5"
                alt="cheese"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEg0lEQVR4nO2Ze4gVVRzHP66BuauBbVjtiuabCKk0V4LqDx9l5FsoCemPQCG1MjQrIyIzS8peJD2IkNV1jQQrKdI0LRUMzVK5RZkm9iRNa9V01+rGD76zHId5XO/OzF7hfuHAcM6Zc853zu89UEYZZaSFbsAUYAhQw3mIQcAK4DRwBlgNNAP1wLWcB+gJrAL+A/Jq20TqH6fvE2AsUEGJoQMwCzipg9pNvAFc48y5AlgC/OUQ+g6YAVRRAqgC3nMO9yHQP2L+DcARZ761P4CngVraCZcCO3SYP4HJMfOnSGfyIc30aDkwmAzRB9ivA+yJuQUPP2v+q8B1us1OwPXA2z5Sm4BxaetRNfCtNtwKdC3wvZ/0zmvAUL13EVAHvK6xY7pdV49mpqFHnYDPiiBhuCNGtMxITNCas4EDzthR4Jkk9egVLfw9cHGRPuYlIAc0qeXUd5Vvbkfp3VaHUIvMuTnZojFKPuJEwKZpo04+6oxD6lPd4DnpkcnoIS1wH+3rdJ/16dE++bEuhSzwmF76vEQ8clfgfsdyunrUIyr4a9JkE680YQZhHfCbc8Bf1Xd7wHzTo0nAFp8eNcjEn4U5mrA5ZRJzIyya1+ZGvG8mvdGnR2ZhJ3pStK+ADZJss6ULHnqqry1r2o1lSsLa5QFfuzaBdWl9SBmbtM+DAWMPaWxjEetmTuQ2+Snz8POUVdaIRLPGRqdFxDZaBOxVPnJSz4tCRCQO8yNEwwiRBpGxPsfkbxYAjili45uADcBxNXu+sYh1KoDpcUSGyF7nZeNHKCqu1vN6jTW3U55e4UsN3g0jslZ9yyLS33rNeZ/sca/2bpLDJIyIJ1K9Y5IvT8SyRk57W3JGIUTssKVI5G/t3dntbKtoWXEia3yjvW+JIzJYipyXYlsweYmaPX/sKLtbFmoLzJC8CBxUPPUD8HxIgjfHiYhvjiKCTOuxGPNrTi4J1Org+YB2IKAk21FGxpvTEOcQLwMWArsdh/iV+mwsCAOV2n7tvJPT1x4Q8s5KnWGHotxKZY071W9lJD8uAB5II0Qx2/4k8G/ELVppdUFA8uYZl76+/n4FGJTEiXiFC5Pvpfqilc7XXerkEi+HEOnn6++fNZFRWsPEaHjEvOGO6bQIwUOD+nYCw0R+mCNa9VkRWXsOgd/DAWa7xlfnyjttf0yAmiiRw1qjkB8+XhL1u6/fqiRPyXq1iNhzqimQFZFTWqOQkk2l5lrkmwTySRLZqzVanVMERmrurjbsV6Vc/x6tdSgpIo86h7MvHgYb+8JXMamWf7GqvTnYu+QfFqqy/47+gu1WofxUWFKWBJEuTjXGiny3KryeBjwiWX/LIeGF4FE+Jx/RzPL9qLrxdMV+rTFVpe9gvZRgWWB2p3KAx+UDzFx+JPN4UPJezIE8H2EfYTvwgUztC6p+zlBRz8z21aoyht74ZseK/KLiQDEHalEFMafC2RrgTWCxKid3A+P1e+5KoLtipsQw0ElUvHZCCvSlIt1Gee4nVJOdKvGpU15iP3RKBj1k4y9s74OUUUYZJI7/ASQbTKZ3KJIpAAAAAElFTkSuQmCC"
              />

              <span className="ml-3">Registrar Alimento</span>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link to={"/myAliments"} className="flex cursor-pointer p-2 ">
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

              <span className="ml-3">Ver Registros de Comidas</span>
            </Link>
          </div>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
          <img
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            alt="exercise"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEuklEQVR4nO2aa4iUVRjHf7uZJVuJaWIfbNkuKxV+0S5aREarlUWSYoWIRZSFRUGhH2MLiS7QBcpLxJZLqFmUy2TJil0MIqMsSi3aIjcpK0pd7eKazcQT/wMPL+8478y8884s+IfDsOc5t+ec5/4uHMMxNDSagdOBC4FZwD3AI0A3sBn4CvgDyANfAnPKXL8NWAnsBg7rd4X6q8ZoYCnwNfAPUCizrQNOS7DPVcDBImscAGZUw8S5wK+RRfcA24CcbutB4DZgJjARGKOXW+QOZmvMPco+bW7s68BkoEW/bzhmWitl5BUt8oFEaXiZ89skcuES1uqFo1jpmIjDetGXUyF6tcBHQJc2fEniYq0H2KS2BfgE2CrdCWgC7tKN2lo/6fU8dos2qcg5JoveXykjHcDvFehFuP2TIq/znmh54BlgmGiD6vfjPU4W/RBV4BSJ1UK1WyTv1q4Ts9am6ubmAwPaeDvQ7tYy3blfBzL6c+r/ocSLXCD6LjJGu5iwzffHiNIUMfMvcInTEVPsOPSIvow64DzgLx1gRwy9U7QvxHjQofV6gRb9Bibslc/wiptW+1abxWG+XsLG/SzRi+JE4BuNWSI/EZiJNmNiepiYy4CRUVLyMKanhDPs0Lg/Na5VJrZfBqBf4vT/S2SFDmdGzbndkXBeTnPMRNcVJiJPyaQGn3NOGfOf1rzXqCPaFRwWFId1Ot9QCsM1/ojmmyNNhN6U9eFKYK/ofTKpSXGpLJnfI7HXzqXIyEQpaFDoYh45zrk+K/8RLmCGxPKQwplM8bYL8sxbJ8H1zhgUgBeBEaKFMMisXmY4QUnPoEL2UrBE7FXHwN/6XezG7FTf9wo8N8vLd7tU4bK0GWnRpgdKvEaTTPA+N/5e4G79vcqNXZ5QxG9MW9n71G9ZXRwmAO+7+aaf40Wzm7W+TyNzxiusuUg+ydLkW4H7XF60Nm1lX6L+nU7OA6Y48dkTbtHB9CCvMeMUopv4na3oeRpwrebdKR8VLu5xaqAnwX88GWNaCyXC8lwFl/khcCo1wCQpvZnSyyO0Vdq8t4hJHQdskDMcUNbYJ0V/V7R1Cu8fBq4GjqOG6HTWxnxEgOXlv4hmiViq6K1CR4rpzPG6Ret7PrLfPPX/BoxNk5FcDRgxnC+vnI/JBN/S+NUMESzWgX+MKGSrKo+FagtsWaHZ+Y01RZjsizHVDYkzXbXwJtdvYf1n6jcL1FBolmMbIwZCe8wpuJnYgKky04Mqw2aOJtWytihCDQWFJC1aulmhfivSZR6uP3GUg+4Vc99FmsVQH8cUrUepohIVvZpjmOKhvDYeq8NUc5sLxchGMsQIhRCHUyzH3CBGtpExwreJIxKlYu1gCXoYE8RyadaMjJZfCPl5tc106tEyKi01M7e+PeRea57rn+0+E3RF5jQcFsgIWLs9kosEEVpT69C7WszRK+SVweFS2MBEd6MzMd19pPFVkCtccPhyozNxsbtxC0UCprn+1fVU5CRoc+XRLucUZ7pCwwtlFOvqhnd02Dfdjc9y1mlZPeKncnGWDjvgvpHfLI9f0NfZhmcCFczswJ8DI1X+Cd9CLKgcMhgZ823PvoU8wBDENUpVzX/YfzlYolQX/Adul2F2BlHlVgAAAABJRU5ErkJggg=="
          ></img>

          <div
            className="flex justify-between w-full items-center"
            onClick={dropDown3}
          >
            <span className="text-[15px] ml-2 font-semibold">Ejercicio</span>
            <span
              className={
                isHidden3
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
            isHidden3
              ? "hidden text-left text-sm  mt-2 w-4/5 mx-auto"
              : " text-left text-sm  mt-2 w-4/5 mx-auto"
          }
        >
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link
              to={"/exercise"}
              className="flex items-center cursor-pointer p-2 "
            >
              <img
                alt="exercise"
                className="h-5 w-5"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADRUlEQVR4nO2XR2iUURDHf9HYUA+2g70Q7A1sKKLYT4qIFw3oQSKC2FA8CKK5xJOKBY2CUZBgPWiiXjwowYKKIGIFS2JEFCyxYU1WBv4fjMtu8q1uNoXvB8u3b16d92bmzYOIiIiIiIiI5kk/4ABQCfzUt1DyJsNs4BMQS/Az+SyaAP2dEmeBsUB7fUsk/wj0pZFzwCmRiECZ/XHybsBgoA2NhEotdEyS+nGqr1B5CnDbmZ6d1l6gDw3MDy2oQ5L6jqr/Dsxw7c0cy51CJj8IDKCBeBHyRKzdQ2dmgUkNAY4Cv1X3CzgCDCTDFGoB5guJKFX9PadQqwTtcoAihe6YFCsGhpIh+rmoVaoT6KBvqfOD4H9BiPEKnQlWAyeBUZlQZpYWm+geMflM4JbK40OO2RvYDXxTvxrgTC0mnDb6yvYrtJv23eei0WMtaFCK43YHtgNf3OacBybSQJzUIlY4WRdgLdA5RH+7d7bFZRAXFc4zyiJNftXJ1of0G48pnQ98cApdVmjPCO2AKk0chNY5Kt/4h/HsfloDvHYKXQPmAlnUM0WacIvK7eVP5sjXJZ8AtEhhTIuQG4E3TqGbwLz6VGiaJnriJilLEOneyqeWAz1Djm0XrLV/6ca5CywBWqZbkRaKZjEXdbaqXKYo9zROqRrlZgVy7Ow65mgLrHTzBJfxonQrdFiDWwQypqpsphVgPrQauAB8jVPsHbALGFnHPK2BPOCZ6/tIJ1TXZtTJMF1wtsvTJZvszCDZDtvDbYfL1WIuSOTJ8ZNhi17q7rGYTn2ZlE2ZVi59NxNCCwgmsJAahtHAHuC9W9hn4BAwqZZ+ZlaLgfuuX7myjpTId45u0co4IdkdhedUsJPKBS7phIPF2ULXAV1r8dOFmjNITmvbgL8YrvS8WqZkrNJAVcp8/4ccBYNXTiF7/xxXHpgonGe5zU2WuSdN9XeqPN7dHwtIH9m6P0q0cYFS5vCbgV5x7Qeq/kHYCU6rQ66SwOBlaMlgfdED2CRTjjkzOgfMlxLFkp8KO2iuGyh4Z1xJ8sBKN1m6iIvdk8D/vimahmaDEj1T5ljIjDfddJJv2uX7XO+bEUFlrJn8aDaKREREREREREREUC/8Ae4ZfBBuF8VKAAAAAElFTkSuQmCC"
              />

              <span className="ml-3">Nuevo Registro</span>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link to={"/newActivitie"} className="flex cursor-pointer p-2 ">
              <img
                alt="exercise"
                className="w-5 h-5"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADIklEQVR4nO2ZXYhMYRjHf8taZFfJR3Jhdyk3tMlHaeXGZ3EhpJQLJNkLCWG5lNYiF0L7cUOE5EKZUYpyo8TaRAl31q4pVmLWxxrt7uit/6m348yM3T0z+x7Nv97OnPM+857nP8/7fL0DRRQco4gwSoDtwAsgDXQAu4kYZgMPRMCMPuvzTiKAUuAQ8FNKfwS2AmXALj17jeOYD7Rbv/xlYLI1PxroB3pxFOOAE8BvEXgLrAnwl3rNP8dBLAPeSMF+4CxQ7pOpBu5ZvrIehzARaAYGpOBLYIlPxmylfcB3yXwCNuAQ1gLvpJzZTieBsT6ZecBjy19uAlNxBNOAK5Zyj4C5Ppkx8oVfkkkM1QrrgDYgZb0w7PEN2BuQrWuBV5a/XAAqhkoiX8p7ysWBSt97jbLnNZ8WmaUMA0+1UL0S0Ej4y/EAfxk0erSgP/zlA8Zxr1rWMtu5JqzF27To0TxbxJQc3XrXD+CAQm2oZg7DFx5mecc1S+4+MCs89f8m8ySEqJUJXgLcobLDWaSzECnRnCHjPNI5LJJr3sYcYA8QAz4rOTYWKqIOxyKTgE1AqyrgTNvWVMpOESlVNj+mcqXPp3C3gsM2YIZkvbLFCSJm3AK++hRPqb09AiwIKGFWSO6DC0S8qOUN04ucU3k0wSc/Xg3WGeCSVcIcLgCPnM58Crih/rsygGgNcFCNVK+13oAsWEeBMJioZDAF2CwH7wwoMtvVr6wMowYLk4gJncul3LOArfYeuAhsEckRQzYiG3VwYCtuaq27wP6AJgvXiBhfuGPNmc+ntV3MCYqTSPuI1FmHB1905GnCapX8okt9iLm26LmTRLzi8zowXc9WW72Pf/QAq3CQiP++2iJxG1ik/GGuMT1PBoRm54i0WiSCENO8OfNymkiX7hdm+P5izZs+3mkiqRznAhWaN+daThPp/EeLdOA4kRbdG18IQlzzTThOpMqKWnFZoFzXuBW1ZuI4EZQnkhnySFIZnygQQXmiWdEppWuTC5YYLBHnkS4ScQz/jUUSUrxW/3F4XV/k0BgQUhuIIMpEJiFLNBTwT6MiiiBk/AElsZmxUBZWTAAAAABJRU5ErkJggg=="
              ></img>

              <span className="ml-3">Nueva Actividad</span>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link to={"/myRecords"} className="flex cursor-pointer p-2 ">
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

              <span className="ml-3">Mis Registros</span>
            </Link>
          </div>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
          <img
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            alt="bread"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABoklEQVR4nO2WMU7DQBBFnwsKcIRAosE+BwoFJRU3oOUWHAK4ERWkoOAElIgSilAQIhhksZGcKLF3BzsenP3SSJGsn9m3O7szEDWnITACJoB4xhi4BY4xBDENAFiMwnuCAY3cgq6BNMA3AK6c9wEDmrjFhEDMtAW8A1/ALh1rViJavTj/IcZB6r5HkI05kaFnT6haaN2TWwUiNVGs6x44aqondAUiLj6rYDQ9Yd2lNQBunOeuyZ7QxR0ZOM+HNqmlyy5V/9sGSJ3MgEydZxud3pz/oGuQR+e5JFwXzvsMJF2DnALfzlcMgK+eMS7lOw/M2QpIoTPgKaAHSOkkNBCtgcy0B+wHxF8kbYKsU+ILknjuavmS+nq0vkQDsuNZ5+UpIA24HxpfGkH43Yls4Yhzj53Nl5SGxpc3eSLFb1YkXrWgZYOnxpdGEHpcWhJfLbp/fpO+NETrkjZPRCtzIwoBIwqWRxTzIJnn216bwAMktzCiNAGSen7bbJCsL6UlisuuBRFrr5YZkETZEDUgJkcUUYA0nkf6BiL/KJaqNyBRUVHM6QciXeXEDvcO8gAAAABJRU5ErkJggg=="
          ></img>

          <div
            className="flex justify-between w-full items-center"
            onClick={dropDown4}
          >
            <span className="text-[15px] ml-2 font-semibold">
              Citas Medicas
            </span>
            <span
              className={
                isHidden4
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
            isHidden4
              ? "hidden text-left text-sm  mt-2 w-4/5 mx-auto"
              : " text-left text-sm  mt-2 w-4/5 mx-auto"
          }
        >
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link
              to={"/citas"}
              className="flex items-center cursor-pointer p-2 "
            >
              <img
                alt="hospital"
                className="h-5 w-5"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD50lEQVR4nO2aW4hWVRTHfzOJKd6GQfCSKWoJQd6aB0FUSjKLJBCreTBFhFSyB8dbMCoSZL1IDxYRZBmDlpcQnxS1C15I0nBMCkEUUlPQ1MZJLXXqiwX/Q4vBmTnfuPb3GfSDzbfZs85/nX3Ovqy1z0AMlcB4oA5oAI4BZ4FrQEHlmtoaZVOna+zasjMCeA+44G642HIeWAc8Wo4O9NNTbXE3dBH4DFgGPA2MBIYAVSpD1DYFWC7bi+5602qQdkl4Drgs538BW4CngAc6oWXXTAa2Sqsg7WdJzEvAHTk8rCcchWkdkfYd+UpCBdAkRzYvuiTw0QV4Xz6a5DMJWUeKmZjZHMjLcLfKJeOYnNiETdWRybL/gYRkY/jVhB2ZI/uvSMQEd1NvJezIarcijiMBu91NbWrHLu9G2BYfO5tD0Z3o65ZdKwcTduTLVnajIjsyV6JnXFiRamidlP3xTgzjDvlQou/o92+gW4KOVAB/yL5Ov3sI5KBELRS5qroFjNEd6S/bW9qrrP4LgZyTqG1WR1V/JkFHxsn2FNBDdXtDYWR5RTWwXfV5xPOytL8Guqv+Z6SDbMXqCryr+kaF51E8Anwk7Q1umFmoH0YWtpuzBa1yiEbtK6uAWuBJoEZj/CGXjwwAhulvNizna/HY0SovKQD1wGOq2yoWRrYUPq/Vqt7Nm+hyAugtX+Gr1iaJLnFt37mntxj4ANirYO808Ctwo9Xbu6q96FvNNXsjM4ExKgXgR+kvdSlDGEsk+qlr+11tvYJ82Fvw4fvGTgSoHVIj0Z9d2wFgf6QT/tWscAcaNi/DsNz6ioSHkp7HXUgUTrZ/WNyVmkXy9UkK8QaJW9yVms/ly867Qpkl4RtFprmdZbp2dPP5QqRwo0RfacfmbeA6sCaHXh7b1+RzH0FUusOzB9uxy5bj5hyaeWyrZWO2YTRL1DLFtlgjp3kSoTy2g+TzEoF8I1GLpUrFHPncFSk6z8VBliekpo9yEvM5O1K4q2KgLIizSDYVD7sR0JjiaHaoOxhoVrYYzWjgpnz8BAwmEVUaswUtj9HUS/uLwGC0TWpT5AnisLSnUgJ6a4dvCf5cNladuNLBfhXKejm1480otknTzgRKhk3023orTwQdkNuhnx39DKTErNUT/P4eh0J3t7S/SRno6TatdQHD1DZb61RZqHHhtn2WLpYV7jTRDh/KykxFxzbG38h5jeXkK3WNzbMXuU9Y4EL9zTolbIsBboVqKVHqXBTT3Bmx/c64i80MZ9NUin8MuJeAb6v7NLBICVK1vnfc0t+2KN+473ndDTVfrG0h/zEmKcD8TWUnMLHcN/U/lIh/AEG7i2wstPDwAAAAAElFTkSuQmCC"
              />

              <span className="ml-3">Nueva Cita</span>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link to={"/myDates"} className="flex cursor-pointer p-2 ">
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

              <span className="ml-3">Mis Citas</span>
            </Link>
          </div>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
          <img
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            alt="bread"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEf0lEQVR4nO2aT4hVdRTHP+rkvDKyN6NOuzJXpeasMqJwIZVDWU47yyChUIpMrFWSzq4oAxEkxVYF7TNMxsqQMpwyy402mbpoCrWxgnRyULty8HvhUPfd+7t/3ptX+IXLvHnn3PP7e87ve87vwTX8f9EFLAPeBHYB3wO/AeN67PNRyUznMaBOm6AGPAXsAS4DUc7nEjAIrAA6J2IA1wMvAb+4Tl0A9gKvamXu0Ixfp6eu70y2AfhM78Tv/wys0+S0BA8Dx10HvgaeAaYXsHUz8Cxw0Nn7EeijibCZ2uYa/AZ4sEL7S4Bvnf2tzVidW9Rxa+A88AIwpepGuGrzRWDMrXZPVcZna7kjRZ15NB93AcNq85j6UAozncGvgBm0DnXgC7V9XLuiEGpuO30JTKP1mAYccNuskM9sc9vJDruJQrfbFRYAcofY2LFb4RMhPjOmPll0Cz7s4nPColMS7gHeB0ZEP0b0/8IcnctrY61z/qAt9rI7J5JC7Hrg7waUw2jKKwFtFLHRAXwnHRtUKmqOdiQddo9IdhHYCNwq+mF/B/R9JL1GKGOjT7KRLG62wkWIJPwg+XMN5M9Lbs5JE2xMcpH0ibSB7JGScackHFQ4nNxAPlly06NJNlapj7sbNdAlWn2hIAFs5UE5ri2Y2M9+jfRT2h/71NelScJNElo+0e4YUF/fSBLukvBR2h/96uvOtGhiWVy7Y676anWBf2FUQuM2WdhfID8PfT4PaH+GdH9NEo5LODXAkM+1q37GAtrvdHWCUgM5JV1b4qowXzaNWZQayFkJQyh7TKsXUx0ekM0jgQmf6Z4p6+x7pWuUpipYfcxsflLW2ePwaxXALGyW7utUBzsTzOZbAbqPp4Xf+EC04lkWVkrXuFlVsJUwm0+XPRCXSWgVwCzcKd3fRcHLwgLMHzm2dipFqTvSaBXALMQ+ZU5aFg+l7fl/oMuRxptogEEZtDJm6J5+m/LYLluvBeiulu5HaUpPSiktn4ixQOnqnyWrLN2yYbbsLEmDJVaH1MflWQfNiBRtubMQRzpzvqIYSItADdLkn0KuIdZJ+VBAffde6dqMziE/5ujdSLbSYMWHw9JdQwBqrtZrBeUsvCvd/TkL2x2qYEaykYV4gofzXAr1OQJnxbE0WOQ46TpkHcyC6bynd06kRR+hF/grpbqTiq1uBroDim3npP9BRviuyx/iLXl3AK86Jv0tFEBNZaFIVY2sIvYiRzxPiyFYZLtBT6++OyMdy3/uz7B5IzAk/aEy94w9bjYOBKzM7cDHATnHYMCdx0w3CDt8Z1ESs91ghjXLWbCZfkcn9Xk9VtXfAdwX8H6va9MGcRsVocdtszHVXkOcOi86FJ1ixx6qYiWSfCYOAJEKylXdvk7SVcZhZ39Ls+/el7hlj1SLXVXwVwxd4k4x7Yi0laq8Lc5cnbWOzkRipPtUYe9XFtctij5Vn+cpKdoo3bhOENOONRP1C4hOVcV3KwXIWzG5KL62fKIGkITpSnSM3n+oKDXqflQzqsLCTuksDTjRr4H/Kq4AyxTKmPog00YAAAAASUVORK5CYII="
          ></img>

          <div
            className="flex justify-between w-full items-center"
            onClick={dropDown5}
          >
            <span className="text-[15px] ml-2 font-semibold mr-3">
              Estado de Ánimo
            </span>
            <span
              className={
                isHidden5
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
            isHidden5
              ? "hidden text-left text-sm  mt-2 w-4/5 mx-auto"
              : " text-left text-sm  mt-2 w-4/5 mx-auto"
          }
        >
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link
              to={"/estados"}
              className="flex items-center cursor-pointer p-2 "
            >
              <img
                alt="emotion"
                className="h-5 w-5 "
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE5klEQVR4nO2ZeYjVVRTHP/NsHbMiSxvbs7KizfqjJEJszyzKyqX6Iwih7I9AU9vQygqDFsKgBdq0DcnIKLJo1xbbG9JJoXUsaJcaaxpn5sWB7w+O1/uW37z73vjHfODC77177zl3Pfece2GAhrEtMCiFoGXA68AONJ7dgG+B91II+wAoAgtoPIuk2wayZo4HupXsuxx7AJOAhcByoA34R42xkd0/h95zVO9f4HASsUBCbXZinKkl2KVypVKeznyvOnNIiO2PlWqs51jgLddQm7V3gFuAC4CDgF2AfYF1KmOd/Rx4HJgOjIjoKwDva1Zzb/SmnJWuAP5T4/4AbgZaypS3vC8js9QDLAWOJBG2oX4H7gEOq9Dhha4hjwC759Bj++gkYJZ09rjZnFvFYNoMXwV8Jmtms7cZrwUjZUvk0ojZvc0tkWnUji27h12HXtDZETIGeBTY6Nr4TaysjfTJwDNuyVha60bpLKBX6WLScpqWqOlcrPZkLK9ykLdgGDBbnVip6bNKX0vQndSHY4C/peNK9/+bVS77qpguBd8BO1I/LnIGxAY0OauloK/7YgjwHPBYbIMGvCpd95GYIyTYNlpzH+oPBT50a/zaCuWPU7kNqWd/hgS/3Ie6Y91h+KusXbc2azk+VZ1L8ir0I1YMXJKn9XtmDnkH64zpVV07zfcDpsrUWmeuCaxTbPBsOVZq32asihQ0N8F4V7/tICuHLYOJwPPuXOiSr+aX5DR1xPJf1FkSMsYNQKX2Vc1Xqnho8P9e8lLny9ZnptPSJp0HpczlOOAn5+HeG/hdLW45JuM3Cc1ckWelPBwhW0atwA3APlXIHS4rFs4emsGiwoBkZIoKbqQs/QysAO4HJqthfWE08KSWWyewjfZONjjJyBpunBqs3ZR8ItmHRPQmwQu8Wt9PkJ7Fkn1+RG8SvMAH9X29yz8PeAPo0CFm32dH5JyoAWiVp2D742iXP0eyb2xER1bo+1z9vtvldzk321zskB8jBsLqXBjE6U/VoyPNgcDM1R6pTfmnGnO5yhYUwx8VkWVhwhSZ2RZ52Js0Q8aBkv1F0JHBKToyU8LW6PdqhayZ42dx+aga5NvNzAn6LkhPdmKvkW7rcDJLkq15i8i2i5QbD7QrWQBWikrlBgE763uCdFsbaiY7rS1WLke7Wwo/JChn7Kpyf5GADgmz68tyrHcNbE9QLnP/ixrMmnlbwuzSodHcLt12d1Yz2Tq1dJcivXozxJn13gp7Lheznb+1QcFSvRgrHdnlncUsSTldl9KmYAn1Y4l0tMmvqwujNNWdJW4XizlTbHN3SkctZ1NVZJdldr0Z4gOrSilmUucq7yUawAQXue0U5H2sPHMiK91bWQzuMTfkF+Ul29zlaHKnfWiSZzl3JnbuDHe3lXa54LlJ/39U5kIiOWe4WPuAYFSz+H6tXq+GKU11nWgL7qv2dl7zKTSYZe6w8k8BI11nYqlNXi7OUXxFeUvpB0bIhbcGzAvymuU1r5KL06HvGZGbwyyYskvqPeknJstUdmvp5GWiYpleGYF+ZZ5G1DpzWY56k9zjqV0f9TtmYR5yLsUdFR5gtgdudTeND7AV0aSX3MwfW6/LidE6awbr+zoXj/RoNhtmavMwrsTLbZha6+x4JqGg03+RnhM2Kq3T2/r4Kh56BhiArYT/AYyf30GdiUErAAAAAElFTkSuQmCC"
              />

              <span className="ml-3">Registrar Emoción</span>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link to={"/viewEstados"} className="flex cursor-pointer p-2 ">
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

              <span className="ml-3">Mis Emociones</span>
            </Link>
          </div>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
          <img
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            alt="bread"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJ0lEQVR4nO2XMU4DMRBFH9AhSs5AlQOkzxGouQM1JRUSTehTpcohqJyCA1DQIJSOngsMQpo0q9VmszY76+g/yZ3lmbeesb0g6sImNgZzciLRmEQc7UhtpTUD3oEf4Bm4zgkWKbJqnCpPOcEiRTYNkZeOuVfArscRu40QWTeSeCwgkiJEHhpJ3OUE6+DfRS6BT5/zBpznBIu+EJc+5z4nUIE8Bi9wAdwC3z7nA1gAZzU1+9wTb0vkr8Ruamn2rwPJvOYEbUGPxj16NBbG9D/iqLQKYyqtji/R92Lrc3O3rbXtmUe4SDqwVhpLJAKTiKMdKYxNpdnbTqIqT610hEgaSyQCk4ijHSmMTaXZ9dZy1Ox71OyFMd0jjkqrMKbScmxiYzAnIyIYmV9kOvuqvr8nIAAAAABJRU5ErkJggg=="
          ></img>

          <div
            className="flex justify-between w-full items-center"
            onClick={dropDown6}
          >
            <span className="text-[15px] ml-2 font-semibold">Análisis</span>
            <span
              className={
                isHidden6
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
            isHidden6
              ? "hidden text-left text-sm  mt-2 w-4/5 mx-auto"
              : " text-left text-sm  mt-2 w-4/5 mx-auto"
          }
        >
          <div className="w-full hover:bg-gray-200 duration-300 rounded-md mt-1 ">
            <Link
              to={"/files"}
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
            <Link to={"/myFiles"} className="flex cursor-pointer p-2 ">
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

              <span className="ml-3">Mis Registros</span>
            </Link>
          </div>
        </div>

        
        {/* Aqui acaba */}
      </div>
      </div>  
      </div>
      </div>

    

    
    

  );
}
