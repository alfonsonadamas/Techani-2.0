import { useState, useEffect } from "react";
// npm install axios
import { useNavigate } from "react-router-dom";

import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import NavRegsitro from "../components/NavRegistro";
import fondo from "../assets/img/fondo-login.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useUserContext();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }

    //console.log(idpatient);
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    navigate("/dashboard");
    console.log(data, error);
  };

  const handleLoginFacebook = async (e) => {
    e.preventDefault();
    setloading(true);
    // try {
    //   const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider: "facebook",
    //   });
    //   console.log(data, error);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <div className="h-screen bg-cover bg-center" data-aos="fade-right">
      <NavRegsitro />
      <div className="mt-10 md:mt-20 flex justify-center">
        <form className="flex flex-col justify-center items-center h-4/5  bg-opacity-30 bg-white backdrop-filter backdrop-blur-md p-6 w-[70%] rounded-lg">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h3 className="sm:text-[4vw] text-[5vw] md:text-[30px] text-center font-semibold font-fuenteTechani mb-7 lg:mb-10">
              Inicia Sesión en Techani
            </h3>
            <div className="flex w-full flex-col lg:flex lg:flex-row lg:p-0">
              <div className="w-full lg:w-1/2 flex flex-col justify-center items-center ">
                <div>
                  <div className="flex flex-col items-center sm:items-start">
                    <label className="text-[4vw] md:text-[18px] mb-2 text-gray-700 font-semibold">
                      Correo Electrónico
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="nombre@ejemplo.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-b-2 focus:outline-none focus:border-b-black transition duration-300 py-2 mb-5 w-[200px] md:w-72 border border-gray-400 rounded shadow "
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col items-center sm:items-start">
                    <label className="text-[4vw] md:text-[18px] mb-2 text-gray-700 font-semibold">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-b-2 focus:outline-none focus:border-b-black transition duration-300 py-2 mb-5 w-[200px] md:w-72 border border-gray-400 rounded shadow "
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex ">
                    <button
                      className="bg-azul rounded-sm text-white w-full py-2 transition-all ease-in disabled:opacity-50 disabled:shadow-none hover:shadow-xl"
                      onClick={(e) => userLogin(e, email, password)}
                      disabled={!email || !password}
                    >
                      Iniciar Sesion
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-[10px] lg:mt-0 w-full lg:w-1/2 flex flex-col items-center  ">
                <div className="flex flex-col items-center justify-center lg:border-l-2 lg:border-l-gray-400 w-full">
                  <div className="flex flex-col justify-center w-[200px] md:w-72">
                    <label className="sm:text-[4vw] text-[4vw] md:text-[18px] mb-2 text-gray-700 font-semibold">
                      También puedes Iniciar Sesión con:
                    </label>
                    <button
                      onClick={handleLoginGoogle}
                      class="bg-white hover:bg-slate-200 transition duration-300 ease-linear text-gray-700 font-semibold py-4 px-4 border border-gray-400 rounded shadow flex items-center mb-5"
                    >
                      <img
                        src="https://img.icons8.com/color/16/000000/google-logo.png"
                        alt="Google Logo"
                        class="mr-2"
                      />
                      <span>Continuar con Google</span>
                    </button>

                    <button
                      onClick={handleLoginFacebook}
                      class="bg-white hover:bg-slate-200 transition duration-300 ease-linear text-gray-700 font-semibold py-4 px-4 border border-gray-400 rounded shadow flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        className="mr-2"
                      >
                        <linearGradient
                          id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                          x1="9.993"
                          x2="40.615"
                          y1="9.993"
                          y2="40.615"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#2aa4f4"></stop>
                          <stop offset="1" stop-color="#007ad9"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                          d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                        ></path>
                      </svg>
                      <span>Continuar con Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
