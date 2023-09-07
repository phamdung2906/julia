/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

import { BASE_URL } from "../Constants/BASE_URL";
import { USERNAME, PASSWORD } from "../Constants/form-constants";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [user, setUser] = useState("1");

  async function login(data) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/users`);
      const dt = await res.json();
      console.log(dt);
      const index = dt.findIndex(
        (user) =>
          user.username.toLowerCase() === data[USERNAME].toLowerCase() &&
          user.password.toLowerCase() === data[PASSWORD].toLowerCase(),
      );

      if (index < 0) throw new Error("Credientials is not correct");
      else {
        console.log("Login successfull");
        setUser(data[USERNAME]);
      }
    } catch (err) {
      console.log("error ;", err.message);
      setErrorLogin(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  function logout() {
    setUser("");
  }
  return (
    <AuthContext.Provider
      value={{ isLoading, errorLogin, login, setErrorLogin, user, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Using context outside Provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
