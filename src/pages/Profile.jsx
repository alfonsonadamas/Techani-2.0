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
import { Form } from "react-router-dom";
import Modal from "../components/Modal";

export default function Profile() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
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
  const [showSupportingPhoto, setShowSupportingPhoto] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [file, setFile] = useState(null);
  const [showAddFamilyForm, setShowAddFamilyForm] = useState(false);
  const [editFamily, setEditFamily] = useState([]);
  const [previewImage, setPreviewImage] = useState(profile.picture);
  const [datosInsulina, setDatosInsulina] = useState([]);
  const [foto, setFoto] = useState([]);
  const [nombreInsulina, setNombreInsulina] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Obtiene la fecha actual
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const fechaActual = `${año}-${mes < 10 ? "0" : ""}${mes}-${dia}`;

  const openModal = (record) => {
    setEditFamily(record);
    console.log(record)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditFamily(null);
  };

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
    verFoto();
    if (foto.length > 0) {
      console.log(foto);
    }
    mInsulina();
    getFamily();
    veriInsulina();

    if (datosInsulina.length > 0) {
      nomIns(datosInsulina[0].marcaInsulina); // Pasa el id de la marca de insulina
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const typeOfFile = selectedFile.name.split(".").slice(-1)[0].toLowerCase();
    const extensions = ["jpg", "png", "jpeg", "pdf"];
    console.log(typeOfFile);
    if (extensions.includes(typeOfFile)) {
      if (selectedFile.size <= 300000) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("El tamaño de la imágen es demasiado grande, elige otra.");
        setFile(null);
        e.target.value = null;
      }
    } else {
      setFile(null);
      setError("El tipo de archivo no es valido.");
      e.target.value = null;
    } // Obtener el archivo seleccionado
    if (selectedFile) {
      setSelectedFile(selectedFile);

      // Crear una vista previa del archivo
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Actualizar la vista previa con la imagen seleccionada
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const verFoto = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("perfil")
        .select()
        .eq("uid", user.id);

      if (error) console.log("error", error);
      setFoto(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitFoto = async ({ filename }, { setErrors, resetForm }) => {
    try {
      setLoading(true);
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${user.id}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
      const { data, error2 } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${user.id}/${file.name}`);
      console.log("link: ", data.publicUrl, error2);

      await supabase.from("perfil").upsert({
        uid: user.id,
        picture: data.publicUrl,
      });
      toast.success("Foto actualizada");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const mInsulina = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("marcaInsulina")
        .select()
        .order("nombreInsulina", { ascending: true });

      if (error) console.log("error", error);

      setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit1 = async (
    { marcaInsulina, bajo, alto },
    { setSubmitting, setErrors, resetForm }
  ) => {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from("datosAdicionales").insert([
        {
          marcaInsulina: marcaInsulina,
          alto: alto,
          bajo: bajo,
          uid: user.id,
        },
      ]);
      if (error) {
        throw error;
      }
      console.log("Se guardo aca bien mamalon", data);
      toast.success("Datos Adicionales Guardados");
      setShowAdditionalData(!showAdditionalData);
      veriInsulina();
    } catch (error) {
      setErrors(
        "Error al guardar el estado de ánimo en la base de datos, verifique su conexión"
      );
      console.error(error);
    } finally {
      resetForm();
    }
  };

  const veriInsulina = async () => {
    try {
      const { data, error } = await supabase
        .from("datosAdicionales")
        .select()
        .eq("uid", user.id);
      if (error) throw error;
      setDatosInsulina(data);
      console.log("Datos de datosInsuluna", datosInsulina);
      console.log("Datos de data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const nomIns = async (idNInsulina) => {
    try {
      const { data, error } = await supabase
        .from("marcaInsulina")
        .select("nombreInsulina")
        .eq("id", idNInsulina);
      if (error) throw error;
      setNombreInsulina(data[0].nombreInsulina);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDatosAdicionales = async (idEL) => {
    try {
      await supabase
        .from("datosAdicionales")
        .delete()
        .eq("uid", user.id)
        .eq("id", idEL);
    } catch (error) {
      console.log(error);
      toast.success("Perfil actualizado correctamente");
      veriInsulina();
      setShowAdditionalData(true);
    }
  };

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
    marcaInsulina: Yup.string().required(
      "El nombre de la marca es obligatorio"
    ),
    alto: Yup.number()
      .required("El registro alto es obligatorio")
      .typeError("El registro alto debe de ser un numero entero")
      .positive("El rango debe de ser positivo"),
    bajo: Yup.number()
      .required("El registro bajo es obligatorio")
      .typeError("El registro bajo debe de ser un numero entero")
      .positive("El rango debe de ser positivo"),
  });

  const validationSchemaDatosAdicionales = Yup.object({
    marcaInsulina: Yup.string().required(
      "El nombre de la marca es obligatorio"
    ),
    alto: Yup.number()
      .required("El registro alto es obligatorio")
      .typeError("El registro alto debe de ser un numero entero")
      .positive("El rango debe de ser positivo"),
    bajo: Yup.number()
      .required("El registro bajo es obligatorio")
      .typeError("El registro bajo debe de ser un numero entero")
      .positive("El rango debe de ser positivo"),
  });

  const familyValidationSchema = Yup.object({
    familyName: Yup.string().required("El nombre es obligatorio"),
    familyPhone: Yup
      .number()
      .typeError("Solo se permiten numeros")
      .min(1000000000, "El teléfono debe tener exactamente 10 dígitos")
      .required("El teléfono es obligatorio"),
    familyEmail: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    familyRelation: Yup.string().required("El parentesco es obligatorio"),
  });

  const getFamily = async () =>{
    try {
      const {data,error} = await supabase
      .from("Familiares")
      .select("*")
      .eq("uid",user.id)
      .order("idFamiliares",{ascending:true});
      setFamilyMembers(data);
    } catch (error) {
      console.error("Error al obtener los datos familiares:", error.message);
    }
  };

  const handleAddFamily = async (
    {familyName,familyPhone,familyEmail,familyRelation},
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setSubmitting(true);
      const {data,error} = await supabase
        .from("Familiares")
        .insert({
          uid:user.id,
          name:familyName,
          phone:familyPhone,
          email:familyEmail,
          relation:familyRelation,
          created_at:fechaActual
        });
        setShowAddFamilyForm(false);
    } catch (error) {
      console.error("Error al agregar los datos familiares:", error.message);
    } finally{
      setSubmitting(false);
      getFamily();
    }
  };

  const handleEditFamily = async (
    { familyName,familyPhone,familyEmail,familyRelation,idFamiliares },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await supabase
      .from("Familiares")
      .update({
        name:familyName,
        phone:familyPhone, 
        email:familyEmail,
        relation:familyRelation,
        created_at:fechaActual
      })
      .eq("uid",user.id)
      .eq("idFamiliares",idFamiliares);

      closeModal();
    } catch (error) {
      console.error("Error al editar los datos familiares:", error.message);
    } finally { 
      setSubmitting(false);
      getFamily();
    }
  };

  const handleDeleteFamily = async (id) => {
    try {
      setLoading(true);
      await supabase
        .from("Familiares")
        .delete()
        .eq("uid",user.id)
        .eq("idFamiliares",id)
    } catch (error) {
      console.error("Error al borrar los datos familiares:", error.message);
    } finally{
      getFamily();
      setLoading(false);
    }
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-16 sm:ml-64">
        <ToastContainer />
        <Formik
          initialValues={{ image: profile.avatar }}
          enableReinitialize={true}
          // validationSchema={}
          onSubmit={submitFoto}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <img
                    src={previewImage} // Mostrar la vista previa en lugar de la imagen original
                    alt="img_perfil"
                    className="rounded-full border-4 border-blue-300 shadow-lg"
                    width={200}
                    onError={() =>
                      setProfile((prevState) => ({
                        ...prevState,
                        picture:
                          "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
                      }))
                    }
                  />
                  <label
                    htmlFor="fileUpload"
                    className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full cursor-pointer transform translate-x-1/2 translate-y-1/2 shadow-lg"
                  >
                    <FaPencilAlt />
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="fileUpload"
                    className="hidden"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="">
                  <button
                    type="submit"
                    className={
                      selectedFile
                        ? "text-blue-500 underline hover:text-blue-600 mt-2"
                        : "hidden"
                    }
                    disabled={!selectedFile}
                  >
                    Cambiar foto de perfil
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
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
            </form>
          )}
        </Formik>
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
          {datosInsulina.length != 0 && datosInsulina.length != 0 ? (
            <div>
              {datosInsulina.map((item) => {
                return (
                  <div className="flex flex-row mt-7">
                    <div className="w-[40%] flex flex-col justify-start items-center">
                      <p className="font-bold">
                        Nombre de la insulina utilizada:
                      </p>
                      <p className="text-xl"> {nombreInsulina}</p>
                    </div>
                    <div className="w-[40%] flex flex-col justify-center items-center">
                      <p className="font-bold">Glucosa en rango:</p>
                      <div className="flex flex-row w-[100%]">
                        <div className="flex flex-col w-[50%] justify-center items-center">
                          <p className="font-bold">Bajo</p>
                          <p className="text-xl">{item.bajo}</p>
                        </div>
                        <div className="flex flex-col w-[50%] justify-center items-center">
                          <p className="font-bold">Alto</p>
                          <p className="text-xl">{item.alto}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[20%] flex flex-row justify-center items-center">
                      <button
                        type="button"
                        onClick={() => deleteDatosAdicionales(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow-md text-center"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {showAdditionalData && (
                <Formik
                  initialValues={{ marcaInsulina: "", bajo: "", alto: "" }}
                  onSubmit={handleSubmit1}
                  validationSchema={validationSchemaDatosAdicionales}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <div className="mt-4 bg-white p-4 rounded shadow-md">
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full mb-4">
                          <label
                            htmlFor="insulinBrand"
                            className="font-bold mb-2"
                          >
                            Marca de Insulina
                          </label>
                          <select
                            id="marcaInsulina"
                            name="marcaInsulina"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.marcaInsulina}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option value="" disabled selected>
                              Seleccione una opción
                            </option>
                            {records.map((record) => (
                              <option
                                key={record.id}
                                defaultValue={null}
                                value={record.id}
                              >
                                {record.nombreInsulina}
                              </option>
                            ))}
                          </select>
                          {errors.marcaInsulina && touched.marcaInsulina && (
                            <div className="text-red-500 text-sm">
                              {errors.marcaInsulina}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col w-full mb-4">
                          <label
                            htmlFor="glucoseRange"
                            className="font-bold mb-2"
                          >
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
                                id="bajo"
                                type="number"
                                name="bajo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              />
                              {errors.bajo && touched.bajo && (
                                <div className="text-red-500 text-sm">
                                  {errors.bajo}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col w-1/2">
                              <label
                                htmlFor="highGlucose"
                                className="font-bold mb-2"
                              >
                                Alto
                              </label>
                              <input
                                id="alto"
                                type="number"
                                name="alto"
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              />
                              {errors.alto && touched.alto && (
                                <div className="text-red-500 text-sm">
                                  {errors.alto}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4">
                          <button
                            type=""
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Guardar
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </Formik>
              )}
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
              {familyMembers.length < 3 && (
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
              )}
              {showAddFamilyForm && (
                <Formik
                  initialValues={{
                    familyName: "",
                    familyPhone: "",
                    familyEmail: "",
                    familyRelation: "",
                  }}
                  validationSchema={familyValidationSchema}
                  onSubmit={handleAddFamily}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
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
                            onBlur={handleBlur}
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
                            max={10}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            onBlur={handleBlur}
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
                            onBlur={handleBlur}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                          {errors.familyRelation && touched.familyRelation && (
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
              <div className="mt-4 flex justify-around w-full">
                {familyMembers.map((member, index) => (
                  <div
                    key={index}
                    className={index!==0 ? "border-l border-black px-6" : "px-6"}
                  >
                    <div>
                        <div className="mb-4">
                          <p className="text-xs text-gray-400">Nombre:</p>
                          <p className="font-bold">{member.name}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-xs text-gray-400">Numero del contacto:</p>
                          <p className="font-bold">{member.phone}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-xs text-gray-400">Correo:</p>
                          <p className="font-bold">{member.email}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-xs text-gray-400">Parentesco:</p>
                          <p className="font-bold">{member.relation}</p>
                        </div>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => openModal(member)}
                        className="mr-2 flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        <FaEdit />
                        <span>Editar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFamily(member.idFamiliares)}
                        className="flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        <FaTrash/>
                        <span>Borrar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        title={"Editar datos familiares"}
      >
        {editFamily && (
          <div>
            <Formik
              initialValues={{
                familyName: editFamily.name,
                familyPhone: editFamily.phone,
                familyEmail: editFamily.email,
                familyRelation: editFamily.relation,
                idFamiliares:editFamily.idFamiliares
              }}
              validationSchema={familyValidationSchema}
              onSubmit={handleEditFamily}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
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
                        onBlur={handleBlur}
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
                        maxLength={10}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                      {errors.familyRelation && touched.familyRelation && (
                        <div className="text-red-500 text-sm">
                          {errors.familyRelation}
                        </div>
                      )}
                    </div>
        <hr className="w-full my-8 border-gray-300" />
        <div className="flex flex-col w-full">
          <button
            type="button"
            onClick={() => setShowSupportingPhoto(!showSupportingPhoto)}
            className="flex items-center justify-between bg-gray-200 px-4 py-2 rounded shadow-md"
          >
            FOTO DE PERFIL{" "}
            {showSupportingPhoto ? <FaCaretUp /> : <FaCaretDown />}
          </button>
          {showSupportingPhoto && (
            <div className="mt-4 bg-white p-4 rounded shadow-md"></div>
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
          </div>
        )}
      </Modal>
    </div>
  );
}
