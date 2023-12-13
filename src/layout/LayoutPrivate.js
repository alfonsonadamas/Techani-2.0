import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const LayoutPrivate = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (user === false) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutPrivate;
