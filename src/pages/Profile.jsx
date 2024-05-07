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
              fullName: name,
              email: email,
              birthday: "",
              phone: "",
            }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form className="flex" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <img
                    src={picture}
                    alt="img_perfil"
                    className="rounded-full"
                    width={200}
                  />
                  <div className="flex flex-col ">
                    <span className="font-semibold mb-3">
                      Nueva Foto de Perfil
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
                <div className="flex flex-col w-full">
                  <span>Nombre Completo</span>
                  <input
                    type="text"
                    disabled
                    name="fullName"
                    value={name}
                    onChange={handleChange}
                    className="bg-gray-50 disabled:text-gray-500 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  ></input>
                  <span>Correo Electrónico</span>
                  <input
                    type="text"
                    disabled
                    name="email"
                    value={email}
                    className="bg-gray-50 disabled:text-gray-500 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  ></input>
                  <span>Fecha de Nacimiento</span>
                  <input
                    type="date"
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  ></input>
                  <span>Telefono</span>
                  <input
                    type="text"
                    className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  ></input>
                  <button type="submit">Enviar</button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
}
