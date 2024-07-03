import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { UsuarioAutenticado } from "./interfaces/usuarioAutenticado";
const url = import.meta.env.VITE_API_URL;
const AuthContext = createContext(undefined);

const AuthProvider = ({ children }: any) => {
  const [usuarioAuth, setUsuarioAuth] = useState<UsuarioAutenticado>({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${url}/api/v1/authenticate/profile`,
          config
        );
        setUsuarioAuth(data);
      } catch (error) {
        console.log(error);
      }
    };

    autenticarUsuario();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        usuarioAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
