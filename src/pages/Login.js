import { useState, useEffect } from "react";
// npm install axios
import { Link, useNavigate } from "react-router-dom"; // npm install @reach/router
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import TechaniLogo from "../assets/img/techani_blanco_nombre.png";

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

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  return (
    <div className="bg-azul">
      <div
        className="flex justify-center items-center h-screen w-full"
        data-aos="fade-up"
      >
        <div className="flex flex-col items-center mr-20">
          <img src={TechaniLogo} alt="Techani" className="w-64" />
          <p className="font-fuentesec text-5xl text-white">
            Tu salud en tus manos
          </p>
        </div>
        <div className="flex flex-col justify-center items-center bg-white h-4/6 w-3/12 rounded-lg ml-10">
          <h2 className="font-fuenteTechani mb-8  text-2xl">INICIAR SESION</h2>
          <form className="flex flex-col items-center">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border-solid border-2 border-gray-300 py-2 px-2 mb-5 w-72"
            />
            <input
              type="password"
              name="email"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border-solid border-2 border-gray-300 py-2 px-2 mb-5 w-72"
            />
            <button
              className="bg-amarillo px-7 py-1 rounded-lg w-44 disabled:opacity-50"
              onClick={(e) => userLogin(e, email, password)}
            >
              Sign In
            </button>
            <Link to="/register">Sign Up</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
