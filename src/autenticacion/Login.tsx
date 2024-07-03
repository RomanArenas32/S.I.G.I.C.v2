import axios from "axios";
import { Alerta, Logo } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginInterface } from "./interface/loginInterface";
import { Mensaje } from "../utils/interfaces/mensaje";



export const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginInterface>({
    usuario: "",
    password: ""
  });
  const [mensaje, setMensaje] = useState<Mensaje>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(`${url}/api/v1/authenticate`, formData);
      localStorage.setItem("token", data.token);
      setMensaje({ msg: "Login exitoso! Redireccionando....", error: false }); 
      setTimeout(() => {
        navigate("./reunion",{
          replace: true
        });
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error)
      setMensaje({
        msg: "Error al iniciar sesión. Verifique sus credenciales e intente nuevamente.",
        error: true,
      });
     setTimeout(() => {
        setMensaje({});
      }, 2000);
      return
    }
  };

  const { msg } = mensaje;

  return (
    <div className="grid place-items-center items-start h-full my-8">
      <div className="bg-gray-900 border-4 border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200 shadow-2xl">
        <div className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col">
          <Logo estilos={"w-24"} />

          <h1 className="text-white text-2xl">Iniciar sesion</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="Usuario"
              type="text"
              name="usuario"
              id="usuario"
              onChange={handleInputChange}
              value={formData.usuario}
            />
            <input
              className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="contraseña"
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              value={formData.password}
            />
            <button
              className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-4 border-gray-700 hover:border-blue-500 transition-all duration-200"
              type="submit"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
      {msg && <Alerta mensaje={mensaje} />}
    </div>
  );
};
