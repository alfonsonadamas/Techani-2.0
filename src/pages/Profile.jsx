import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import { Formik } from "formik";

export default function Profile() {
  const [file, setFile] = useState(null);
  const { user } = useUserContext();
  const [picture, setPicture] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // const conseguirUrl = async () => {
  //   try {
  //     // const { data, error } = await supabase.storage
  //     //   .from("analisis_archivos")
  //     //   .list("123");
  //     const { data, error } = await supabase.storage
  //       .from("analisis_archivos")
  //       .download(`123/folder.svg`);
  //     const url = URL.createObjectURL(data);
  //     console.log(url);
  //     console.log(data, error);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "folder.svg";
  //     a.click();
  //   } catch (error) {}
  // };

  const findUrl = async () => {
    try {
      const { data, error } = supabase.storage
        .from("analisis_archivos")
        .getPublicUrl(
          `${user.id}/profile_img${
            file.type === "image/png" ? ".png" : ".jpeg"
          }`
        );
      console.log(data.publicUrl, error);
      setUrl(data.publicUrl);
      updateProfile();
    } catch (error) {}
  };

  const updateProfile = async () => {
    try {
      const updates = {
        id: user.id,
        data: {
          avatar_url: url,
          picture: url,
        },
      };
      const { data, error } = await supabase.auth.updateUser(updates);
      console.log(data, error);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (
    { fullName, email, birthday, phone },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await supabase.storage
        .from("analisis_archivos")
        .upload(
          `${user.id}/profile_img${
            file.type === "image/png" ? ".png" : ".jpeg"
          }`,
          file
        );
      findUrl();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.user_metadata.full_name);
      setEmail(user.email);

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
    }
  }, [user]);

  return (
    <div>
      <SideBar></SideBar>
      <div className="p-16 pt-16 sm:ml-64">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            birthday: '',
            phone: '',
            email: '',
            location: '',
            password: '',
            verify: ''
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              {/* Parte de Foto de Perfil */}
              <div className="flex flex-col items-center">
                <img
                  src={picture}
                  alt="img_perfil"
                  className="rounded-full"
                  width={200}
                />
                <div className="flex flex-col mt-4">
                  <span className="font-semibold mb-3">
                    Foto de Perfil
                  </span>
                  <input
                    name="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    type="file"
                    accept="image/*"
                  ></input>
                </div>
              </div>
              {/* Formulario */}
              <div className="flex flex-wrap w-full ml-8">
                <div className="flex flex-col w-1/2 pr-2">
                  <span>Nombre</span>
                  <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                  <span>Apellido</span>
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 pr-2">
                  <span>Fecha de Nacimiento</span>
                  <input
                    type="date"
                    name="birthday"
                    value={values.birthday}
                    onChange={handleChange}
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                  <span>Telefono</span>
                  <input
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 pr-2">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                  <span>Ubicación</span>
                  <input
                    type="text"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 pr-2">
                  <span>Contraseña</span>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                  <span>Verificar</span>
                  <input
                    type="password"
                    name="verify"
                    value={values.verify}
                    onChange={handleChange}
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
  
  
}
