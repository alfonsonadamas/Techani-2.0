import React from "react";
import { useNavigate } from "react-router-dom";
import "../dist/output.css";

export default function Main() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
    //navigate("/login");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Main</h1>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}
