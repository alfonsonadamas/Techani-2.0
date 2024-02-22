import React, { useState } from "react";
import { supabase } from "../config/supabase";
import * as Yup from "yup";
import NavRegistro from "../components/NavRegistro";
import { Formik } from "formik";
import logoTechani from "../assets/img/Techani negro letras.png";

export default function SignUp() {
  const [loading, setloading] = useState(false);
  const [form, setForm] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  const showForm = () => {
    setForm(true);
  };

  const createNewUser = async (
    { email, password, name, lastname },
    { setSubmitting, setErrors, resetForm }
  ) => {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name + " " + lastname,
          },
        },
      });
      console.log(data, error);
      setSendEmail(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email Invalido").required("Email Requerido"),
    password: Yup.string()
      .required("Contraseña Requerida")
      .min(6, "Contraseña no valida mínimo 6 caracteres")
      .max(15),
    name: Yup.string().required("Nombre Requerido"),
    lastname: Yup.string().required("Apellido Requerido"),
  });

  const handleLoginFacebook = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });

      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavRegistro data={"signup"}></NavRegistro>
      {sendEmail ? (
        <div className="w-full mt-28 flex justify-center ">
          <div
            class="flex flex-col w-2/5 items-center p-4 mb-4 text-sm  border border-gray-300 rounded-lg shadow-xl "
            role="alert"
          >
            <img src={logoTechani} width={120} alt="logo_techani"></img>
            <span className="sr-only">Info</span>
            <div className="mt-2 flex flex-col items-center py-8">
              <span class="font-medium text-xl mb-2">
                ¡Bienvenido a Techani!
              </span>
              <span class="font-normal text-center">
                Use el enlace enviado a su correo electrónico para terminar el
                proceso de registro de sus datos iniciales
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {form ? (
            <Formik
              initialValues={{
                email: "",
                password: "",
                name: "",
                lastname: "",
              }}
              onSubmit={createNewUser}
              validationSchema={validationSchema}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                isSubmitting,
              }) => (
                <form
                  className="flex flex-col items-center"
                  onSubmit={handleSubmit}
                >
                  <h2 className="mb-8 text-2xl font-semibold font-fuenteTechani ">
                    Crea una cuenta
                  </h2>
                  <div className="flex flex-col mb-5">
                    <label className="text-sm">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      onChange={handleChange}
                      className={
                        errors.name && touched.name && errors.name
                          ? "text-red-400 border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black transition duration-300  border-red-400 py-2 w-72 focus:ring-0 "
                          : "border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black transition duration-300  border-gray-300 py-2 w-72 focus:ring-0 "
                      }
                      autoComplete="off"
                    />
                    <p className="text-red-400 mt-2">
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>
                  <div className="flex flex-col mb-5">
                    <label className="text-sm ">Apellidos</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Apellidos"
                      onChange={handleChange}
                      className={
                        errors.lastname && touched.lastname && errors.lastname
                          ? "text-red-400 border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black transition duration-300  border-red-400 py-2 w-72 focus:ring-0 "
                          : "border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black transition duration-300  border-gray-300 py-2 w-72 focus:ring-0 "
                      }
                      autoComplete="off"
                    />
                    <p className="text-red-400 mt-2">
                      {errors.lastname && touched.lastname && errors.lastname}
                    </p>
                  </div>
                  <div className="flex flex-col mb-5">
                    <label className="text-sm">Correo Electrónico</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="nombre@ejemplo.com"
                      onChange={handleChange}
                      className={
                        errors.email && touched.email && errors.email
                          ? "text-red-400 input border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black transition duration-300  border-red-400 py-2 w-72 focus:ring-0 "
                          : "border-b-2 border-l-0 input border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:ring-0 focus:border-b-black transition duration-300  border-gray-300 py-2 w-72"
                      }
                      autoComplete="off"
                    />
                    <p className="text-red-400 mt-2">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>

                  <div className="flex flex-col mb-5">
                    <label className="text-sm">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      onChange={handleChange}
                      className={
                        errors.password && touched.password && errors.password
                          ? "text-red-400 border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black transition duration-300  border-red-400 py-2 w-72 focus:ring-0 "
                          : "border-b-2 border-l-0 border-t-0 border-r-0 focus:border-transparent focus:outline-none focus:border-b-black transition duration-300  border-gray-300 py-2 w-72 focus:ring-0 "
                      }
                      autoComplete="off"
                    />
                    <p className="text-red-400 mt-2">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>

                  <p className="text-[12px] mb-8 text-gray-400 w-80 text-center ">
                    Al crear una cuenta, aceptas nuestras Condiciones de Uso y
                    has leído y comprendido la Política de Privacidad
                  </p>
                  <button
                    type="submit"
                    className="bg-azul w-28 rounded-sm text-white py-2 transition-all ease-in disabled:opacity-50 disabled:shadow-none hover:shadow-xl"
                    disabled={
                      isSubmitting ||
                      values.email === "" ||
                      values.password === "" ||
                      values.name === "" ||
                      values.lastname === ""
                    }
                  >
                    Continuar
                  </button>
                </form>
              )}
            </Formik>
          ) : (
            <div className="h-full" data-aos="fade-up">
              <div className="flex flex-col items-center justify-center w-full h-full mt-20">
                <h2 className="mb-8 text-2xl font-semibold font-fuenteTechani ">
                  Crea una cuenta
                </h2>
                <p className="text-[12px] mb-8 text-gray-400 w-80 text-center ">
                  Al crear una cuenta, aceptas nuestras Condiciones de Uso y has
                  leído y comprendido la Política de Privacidad
                </p>
                <button
                  onClick={handleLoginGoogle}
                  className="bg-white hover:bg-slate-200 transition duration-300 ease-linear text-gray-700 font-semibold py-4 px-16 border border-gray-400 rounded shadow flex items-center mb-5 disabled:opacity-20 disabled:cursor-default"
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
                  className="bg-white hover:bg-slate-200 transition duration-300 ease-linear text-gray-700 font-semibold py-4 px-14 border mb-5 border-gray-400 rounded shadow flex items-center justify-center disabled:opacity-20 disabled:cursor-default"
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
                <button
                  onClick={showForm}
                  className="bg-white hover:bg-slate-200 transition duration-300 ease-linear text-gray-700 font-semibold py-4 px-16 border border-gray-400 rounded shadow flex items-center mb-5 disabled:opacity-20 disabled:cursor-default"
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <span>Continuar con Email</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
