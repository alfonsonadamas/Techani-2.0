import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setUser(false);
      } else {
        setUser(session.user);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
