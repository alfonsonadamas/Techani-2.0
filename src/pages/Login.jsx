import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import NavRegsitro from "../components/NavRegistro";
import { Formik } from "formik";

export default function Login() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserContext();

  const userLogin = async (
    { email, password, validate },
    { setSubmitting, setErrors, resetForm }
  ) => {
    setSubmitting(true);
    try {
      const user = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (user.error.message === "Invalid login credentials") {
        return setErrors({ validate: "Correo o contraseña incorrectos" });
      }
      if (user.error.message === "Email not confirmed") {
        return setErrors({ validate: "Correo Electronico no confirmado" });
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    // setloading(true);
    // try {
    //   const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider: "google",
    //   });
    //   console.log(data, error);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleLoginFacebook = async (e) => {
    e.preventDefault();
    // setloading(true);
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
  }, [user, navigate]);
  return (
    <div className="h-screen" data-aos="fade-right">
      <NavRegsitro data={"login"} />
      <Formik
        initialValues={{
          email: "",
          password: "",
          validate: "",
        }}
        onSubmit={userLogin}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          isSubmitting,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center h-4/5"
          >
            <div className="flex flex-col items-center justify-center h-full w-full">
              <h3 className="text-2xl font-semibold font-fuenteTechani mb-10">
                Inicia Sesión en Techani
              </h3>
              <div className="flex w-full">
                <div className="w-1/2 flex flex-col justify-center items-end pr-20">
                  <div>
                    <div className="flex flex-col mb-3">
                      <label className="text-sm">Correo Electrónico</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="nombre@ejemplo.com"
                        onChange={handleChange}
                        className="focus:ring-0  border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black focus:border-t-0 transition duration-300 mb-1  border-gray-300 py-2  w-72"
                        autoComplete="off"
                      />
                      <p className="text-red-400">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>

                    <div className="flex flex-col mb-3">
                      <label className="text-sm">Contraseña</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        className="focus:ring-0 border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black transition duration-300  border-gray-300 py-2 mb-1 w-72"
                        autoComplete="off"
                      />
                      <p className="text-red-400">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-red-400 mb-2"> {errors.validate}</p>
                      <button
                        className="bg-azul rounded-sm text-white w-full py-2 transition-all ease-in disabled:opacity-50 disabled:shadow-none hover:shadow-xl"
                        type="submit"
                        disabled={
                          !values.email || !values.password || isSubmitting
                        }
                      >
                        Iniciar Sesion
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 ">
                  <div className="flex flex-col pl-20 py-20 justify-center border-l-2 border-l-gray-400 w-7/12">
                    <button
                      onClick={handleLoginGoogle}
                      className="bg-white hover:bg-slate-200 transition duration-300 ease-linear text-gray-700 font-semibold py-4 px-4 border border-gray-400 rounded shadow flex items-center justify-center mb-5 disabled:opacity-20 disabled:cursor-default"
                      disabled={loading}
                    >
                      <img
                        src="https://img.icons8.com/color/16/000000/google-logo.png"
                        alt="Google Logo"
                        className="mr-2"
                      />
                      <span>Continuar con Google</span>
                    </button>

                    <button
                      onClick={handleLoginFacebook}
                      className="bg-white hover:bg-slate-200 transition duration-300 ease-linear text-gray-700 font-semibold py-4 px-4 border border-gray-400 rounded shadow flex items-center justify-center disabled:opacity-20 disabled:cursor-default"
                      disabled={loading}
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
                          <stop offset="0" stopColor="#2aa4f4"></stop>
                          <stop offset="1" stopColor="#007ad9"></stop>
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
          </form>
        )}
      </Formik>
    </div>
  );
}
