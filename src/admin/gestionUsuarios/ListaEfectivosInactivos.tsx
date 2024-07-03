import axios from "axios";
import { useEffect, useState } from "react";
import { UsuarioCreate } from "../interfaces/usuario";
import { Alerta } from '../../utils/Alerta';
import { Mensaje } from "../../utils/interfaces/mensaje";
import { BotonVolver } from "../../utils";
import { DetailsUser } from "./components";

export const ListaEfectivosInactivos = () => {
  const url = import.meta.env.VITE_API_URL;
  const [efectivosInactivos, setEfectivosInactivos] = useState<UsuarioCreate[]>([]);
  const [mensaje, setMensaje] = useState<Mensaje>({});

  useEffect(() => {
    const obtenerUsuariosInactivos = async () => {
      try {
        const resp = await axios.delete(`${url}/api/v1/usuarios/deleted`);
        setEfectivosInactivos(resp.data);
      } catch (error) {
        setMensaje({
          error: true,
          msg: "Error al obtener la lista de efectivos inactivos",
        });
      }
    };
    obtenerUsuariosInactivos();
  }, []);


  const { msg } = mensaje;

  return (
    <div className="flex flex-col ">
      <BotonVolver/>
      <div className="flex items-center justify-center p-5">
        <div className="rounded-lg bg-gray-200 p-5">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-5 fill-gray-500 transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-full max-w-[170px] bg-white pl-2 text-black font-semibold outline-0"
              placeholder="Apellido del efectivo"
              id=""
            />
            <input
              type="button"
              value="Buscar"
              className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
            />
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-center uppercase">
        Lista de efectivos inactivos:{" "}
      </h2>
      <div className="p-6 w-full">
        {efectivosInactivos.map((ef) => (
          <div key={ef.legajo}>
            <div className="flex md:flex-row gap-2 font-semibold text-lg justify-between my-4 bg-red-600 p-4 shadow-xl">
              <div>
                <p>
                  <span className="font-bold">Nombre y apellido: </span>
                  {ef.apellido} {ef.nombre}
                </p>
                <p>Legajo: {ef.legajo}</p>
                <p>Delegacion: {ef.delegacion}</p>
              </div>
              <DetailsUser usuario={ef}/>
            </div>
          </div>
        ))}
      </div>
      {msg && <Alerta mensaje={mensaje} />}
    </div>
  );
};
