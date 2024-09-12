import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPencilAlt,
  FaCaretDown,
  FaCaretUp,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

export default function Profile() {
  const { user } = useUserContext();
  const [profile, setProfile] = useState({
    picture:
      "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    name: "",
    email: "",
    birthday: "",
    phone: "",
  });
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [showSupportingFamily, setShowSupportingFamily] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showAddFamilyForm, setShowAddFamilyForm] = useState(false);
  const [editingFamilyMember, setEditingFamilyMember] = useState(null);

  useEffect(() => {
    if (user) {
      const avatarUrl =
        user.user_metadata.avatar_url ||
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
      setProfile({
        name: user.user_metadata.full_name || "",
        email: user.email || "",
        birthday: user.user_metadata.birthday || "",
        phone: user.user_metadata.phone || "",
        picture: avatarUrl,
      });
    }
  }, [user]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: values.fullName,
          birthday: values.birthday,
          phone: values.phone,
        },
      });

      if (error) {
        toast.error("Error al actualizar el perfil");
      } else {
        toast.success("Perfil actualizado correctamente");
        setProfile((prev) => ({
          ...prev,
          name: values.fullName,
          birthday: values.birthday,
          phone: values.phone,
        }));
      }
    } catch (error) {
      toast.error("Error inesperado al actualizar el perfil");
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión");
    } else {
      toast.success("Sesión cerrada correctamente");
    }
  };

  const handleImageError = () => {
    setProfile((prevState) => ({
      ...prevState,
      picture:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const filePath = `${user.id}/${file.name}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
  
    if (error) {
      console.error("Error al subir la imagen:", error);
      toast.error("Error al subir la imagen: " + error.message);
    } else {
      const { publicURL } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      await supabase.auth.updateUser({
        data: { avatar_url: publicURL },
      });
      setProfile((prevState) => ({
        ...prevState,
        picture: publicURL,
      }));
      toast.success("Imagen de perfil actualizada");
    }
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    birthday: Yup.date().required("La fecha de nacimiento es obligatoria"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    password: Yup.string().min(
      6,
      "La contraseña debe tener al menos 6 caracteres"
    ),
  });

  const familyValidationSchema = Yup.object({
    familyName: Yup.string().required("El nombre es obligatorio"),
    familyPhone: Yup.string().required("El teléfono es obligatorio"),
    familyEmail: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    familyRelation: Yup.string().required("El parentesco es obligatorio"),
  });

  const handleAddFamily = (values) => {
    const newMember = {
      familyName: values.familyName,
      familyPhone: values.familyPhone,
      familyEmail: values.familyEmail,
      familyRelation: values.familyRelation,
    };
    setFamilyMembers([...familyMembers, newMember]);
    setShowAddFamilyForm(false);
  };

  const handleEditFamily = (index) => {
    setEditingFamilyMember(index);
    setShowAddFamilyForm(true);
  };

  const handleDeleteFamily = (index) => {
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers.splice(index, 1);
    setFamilyMembers(updatedFamilyMembers);
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-16 sm:ml-64">
        <ToastContainer />
        <Formik
          initialValues={{
            fullName: profile.name,
            email: profile.email,
            birthday: profile.birthday,
            phone: profile.phone,
            password: "",
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <img
                    src={profile.picture}
                    alt="img_perfil"
                    className="rounded-full border-4 border-blue-300 shadow-lg"
                    width={200}
                    onError={() => setProfile((prevState) => ({ ...prevState, picture: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" }))}
                  />
                  <label
                    htmlFor="fileUpload"
                    className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full cursor-pointer transform translate-x-1/2 translate-y-1/2 shadow-lg"
                  >
                    <FaPencilAlt />
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="flex flex-col w-1/2 pr-2 mb-4">
                  <label htmlFor="fullName" className="font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.fullName && touched.fullName && (
                    <div className="text-red-500 text-sm">
                      {errors.fullName}
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-1/2 pl-2 mb-4">
                  <label htmlFor="email" className="font-bold mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div className="flex flex-col w-1/2 pr-2 mb-4">
                  <label htmlFor="birthday" className="font-bold mb-2">
                    Fecha de Nacimiento
                  </label>
                  <input
                    id="birthday"
                    type="date"
                    name="birthday"
                    value={values.birthday}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.birthday && touched.birthday && (
                    <div className="text-red-500 text-sm">
                      {errors.birthday}
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-1/2 pl-2 mb-4">
                  <label htmlFor="phone" className="font-bold mb-2">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm">{errors.phone}</div>
                  )}
                </div>
                <div className="flex flex-col w-full mb-4">
                  <label htmlFor="password" className="font-bold mb-2">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                  <button
                    type="button"
                    className="text-blue-500 underline hover:text-blue-600 mt-2"
                  >
                    Cambiar Contraseña
                  </button>
                </div>
                <div className="flex justify-end space-x-4 mt-8 w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow-md"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
              <hr className="w-full my-8 border-gray-300" />
              <div className="flex flex-col w-full">
                <button
                  type="button"
                  onClick={() => setShowAdditionalData(!showAdditionalData)}
                  className="flex items-center justify-between bg-gray-200 px-4 py-2 rounded shadow-md"
                >
                  DATOS ADICIONALES{" "}
                  {showAdditionalData ? <FaCaretUp /> : <FaCaretDown />}
                </button>
                {showAdditionalData && (
                  <div className="mt-4 bg-white p-4 rounded shadow-md">
                    <div className="flex flex-col w-full mb-4">
                      <label htmlFor="insulinBrand" className="font-bold mb-2">
                        Marca de Insulina
                      </label>
                      <select
                        id="insulinBrand"
                        name="insulinBrand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">Seleccione una opción</option>
                        <option value="Marca 1">Marca 1</option>
                        <option value="Marca 2">Marca 2</option>
                        <option value="Marca 3">Marca 3</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-full mb-4">
                      <label htmlFor="glucoseRange" className="font-bold mb-2">
                        Glucosa en Rango
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="lowGlucose"
                            className="font-bold mb-2"
                          >
                            Bajo
                          </label>
                          <input
                            id="lowGlucose"
                            type="number"
                            name="lowGlucose"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="highGlucose"
                            className="font-bold mb-2"
                          >
                            Alto
                          </label>
                          <input
                            id="highGlucose"
                            type="number"
                            name="highGlucose"
                            className="bg-gray-50 borderborder-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <hr className="w-full my-8 border-gray-300" />
              <div className="flex flex-col w-full">
                <button
                  type="button"
                  onClick={() => setShowSupportingFamily(!showSupportingFamily)}
                  className="flex items-center justify-between bg-gray-200 px-4 py-2 rounded shadow-md"
                >
                  FAMILIARES DE APOYO{" "}
                  {showSupportingFamily ? <FaCaretUp /> : <FaCaretDown />}
                </button>
                {showSupportingFamily && (
                  <div className="mt-4 bg-white p-4 rounded shadow-md">
                    <div className="flex justify-end mb-4">
                      <button
                        type="button"
                        onClick={() => setShowAddFamilyForm(!showAddFamilyForm)}
                        className="flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        <FaPlus />
                        <span>Agregar Familiar</span>
                      </button>
                    </div>
                    {showAddFamilyForm && (
                      <Formik
                        initialValues={{
                          familyName: "",
                          familyPhone: "",
                          familyEmail: "",
                          familyRelation: "",
                        }}
                        validationSchema={familyValidationSchema}
                        onSubmit={(values) => {
                          handleAddFamily(values);
                        }}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          values,
                          errors,
                          touched,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                              <div className="flex flex-col w-1/2 pr-2 mb-4">
                                <label
                                  htmlFor="familyName"
                                  className="font-bold mb-2"
                                >
                                  Nombre
                                </label>
                                <input
                                  id="familyName"
                                  type="text"
                                  name="familyName"
                                  value={values.familyName}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                                {errors.familyName && touched.familyName && (
                                  <div className="text-red-500 text-sm">
                                    {errors.familyName}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col w-1/2 pl-2 mb-4">
                                <label
                                  htmlFor="familyPhone"
                                  className="font-bold mb-2"
                                >
                                  Teléfono
                                </label>
                                <input
                                  id="familyPhone"
                                  type="text"
                                  name="familyPhone"
                                  value={values.familyPhone}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                                {errors.familyPhone && touched.familyPhone && (
                                  <div className="text-red-500 text-sm">
                                    {errors.familyPhone}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col w-1/2 pr-2 mb-4">
                                <label
                                  htmlFor="familyEmail"
                                  className="font-bold mb-2"
                                >
                                  Correo Electrónico
                                </label>
                                <input
                                  id="familyEmail"
                                  type="email"
                                  name="familyEmail"
                                  autoComplete="off"
                                  value={values.familyEmail}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                                {errors.familyEmail && touched.familyEmail && (
                                  <div className="text-red-500 text-sm">
                                    {errors.familyEmail}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col w-1/2 pl-2 mb-4">
                                <label
                                  htmlFor="familyRelation"
                                  className="font-bold mb-2"
                                >
                                  Parentesco
                                </label>
                                <input
                                  id="familyRelation"
                                  type="text"
                                  name="familyRelation"
                                  value={values.familyRelation}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                                {errors.familyRelation &&
                                  touched.familyRelation && (
                                    <div className="text-red-500 text-sm">
                                      {errors.familyRelation}
                                    </div>
                                  )}
                              </div>
                              <div className="flex justify-end w-full">
                                <button
                                  type="submit"
                                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                  Guardar
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </Formik>
                    )}
                    <div className="mt-4">
                      {familyMembers.map((member, index) => (
                        <div
                          key={index}
                          className="flex justify-between border-b border-gray-300 pb-2 mb-2"
                        >
                          <div>
                            <div>{member.familyName}</div>
                            <div>{member.familyPhone}</div>
                            <div>{member.familyEmail}</div>
                            <div>{member.familyRelation}</div>
                          </div>
                          <div>
                            <FaEdit
                              onClick={() => handleEditFamily(index)}
                              className="cursor-pointer mr-2 text-blue-500 hover:text-blue-600"
                            />
                            <FaTrash
                              onClick={() => handleDeleteFamily(index)}
                              className="cursor-pointer text-red-500 hover:text-red-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}