import {
  delegaciones,
  eventoPorTipo,
  tipoEvento,
  conflictividad,
} from "../../info";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Mensaje } from "../../utils/interfaces/mensaje";
import { Alerta, BotonVolver } from "../../utils";
import AuthContext from "../../context/AuthProvider";
import { NuevoEvento } from "./interface/nuevoEvento";
import { localidades, partidos } from "../../info";


const url = import.meta.env.VITE_API_URL;


export const CargarEventos = () => {
  const { usuarioAuth }: any | undefined = useContext(AuthContext);
  const [image, setImage] = useState<any>(null);
  const [organizaciones, setOrganizaciones] = useState<string[]>([]);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<string>("");
  const [mensaje, setMensaje] = useState<Mensaje>({});
  const [org, setOrg] = useState<string[]>([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NuevoEvento>({
    responsable: "",
    partido: partidoSeleccionado,
    localidad: "",
    tipo: "",
    subtipo: "",
    programacion: "",
    infoDelegacion: "",
    infoReunion: "",
    extracto: "",
    fecha: "",
    hora: "",
    coordenadas: "",
    lugar: "",
    barrio: "",
    conflictividad: "",
    banner: "sin banner",
    org: organizaciones,
    usuarioAuth,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e: { target: { files: any[]; }; }) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };



  //OBTENER LAS ORG CUANDO CARGE LA PAGINA
  useEffect(() => {
    const obtenerOrg = async () => {
      const resp = await axios.get(`${url}/api/v1/organizaciones`);
      setOrg(resp.data);
    };
    obtenerOrg();
  }, []);
  

  //ENVIAR EL EVENTO
  const handleSubmit = async (e: React.SyntheticEvent)  => {
    e.preventDefault();
    formData.partido = partidoSeleccionado;
    console.log(formData)
    const hasEmptyFields = Object.values(formData).some(value => value === "");
    if (hasEmptyFields) {
      setMensaje({error: true, msg: "No puede haber campos vacios"});
      setTimeout(() => {
        setMensaje({})
      }, 1500);
      return;
    }
    try {
      const resp = await axios.post(`${url}/api/v1/eventos`, formData);
      setMensaje({error: false, msg:"Evento creado correctamente"});
      setTimeout(() => {
        setMensaje({})
        navigate("../reunion")
      }, 1500);
      
    } catch (error) {
      setMensaje({error: true, msg: "El evento no pudo registrarse"})
    }
  };

  const {msg} = mensaje;
  return (
    <>
      <BotonVolver />
      <div className=" bg-gray-800 rounded-lg shadow-2xl p-2 grid place-items-center my-4 md:mx-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4 uppercase pb-2">
          Carga de eventos
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex flex-col">
              <select
                id="responsable"
                onChange={handleInputChange}
                value={formData.responsable}
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                {delegaciones.map((delegacion) => (
                  <option className="font-semibold" key={delegacion}>
                    {delegacion}
                  </option>
                ))}
              </select>

              <select
                value={partidoSeleccionado}
                onChange={(e) => setPartidoSeleccionado(e.target.value)}
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                <option value={formData.partido} id="partido">
                  --Seleccione un partido--
                </option>
                {Object.values(partidos).map((partido) => (
                  <option key={partido} value={partido}>
                    {partido}
                  </option>
                ))}
              </select>

              <select
                id="localidad"
                value={formData.localidad}
                onChange={handleInputChange}
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                <option value="">--Seleccione una localidad--</option>
                {partidoSeleccionado &&
                  partidos[partidoSeleccionado].map((localidad) => (
                    <option key={localidad} value={localidad}>
                      {localidad}
                    </option>
                  ))}
              </select>

              <select
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                id="tipo"
                onChange={handleInputChange}
                value={formData.tipo}
              >
                {eventoPorTipo.map((evento) => (
                  <option className="font-semibold" key={evento}>
                    {evento}
                  </option>
                ))}
              </select>

              <input
                placeholder="ej: Reclamo en contra del DNU"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                id="subtipo"
                onChange={handleInputChange}
                value={formData.subtipo}
              />

              <select
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                id="programacion"
                onChange={handleInputChange}
                value={formData.programacion}
              >
                {tipoEvento.map((evento) => (
                  <option className="font-semibold" key={evento}>
                    {evento}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Informe de la delegacion"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                id="infoDelegacion"
                onChange={handleInputChange}
                value={formData.infoDelegacion}
              ></textarea>

              <textarea
                placeholder="Informe de Reunion"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                id="infoReunion"
                onChange={handleInputChange} 
                value={formData.infoReunion}
              ></textarea>

              <textarea
                placeholder="Extracto (Breve reseña del informe)"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                id="extracto"
                onChange={handleInputChange}
                value={formData.extracto}
              ></textarea>
            </div>

            <div className="flex flex-col w-auto">
              <input
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="date"
                id="fecha"
                onChange={handleInputChange}
                value={formData.fecha}
              />
              <input
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="time"
                id="hora"
                onChange={handleInputChange}
                value={formData.hora}
              />
              <input
                placeholder="ej: -36.781083, -59.867621"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                id="coordenadas"
                onChange={handleInputChange}
                value={formData.coordenadas}
              />

              <input
                placeholder="lugar o entidad. ej: Ministerio de trabajo"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                id="lugar"
                onChange={handleInputChange}
                value={formData.lugar}
              />
              <input
                placeholder="Indique barrio donde transcurrirá el evento"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                id="barrio"
                onChange={handleInputChange}
                value={formData.barrio}
              />

              {/* ORGANIZACIONES: LA QUE QUEDA ES LA DE ARRIBA */}

              <select
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                id="org"
                onChange={handleInputChange}
                value={formData.org}
              >
                {org.map((org) => (
                  <option className="font-semibold" key={org.id}>
                    {org.nombre_organizacion}
                  </option>
                ))}
              </select>

              <select
                id="conflictividad"
                onChange={handleInputChange}
                value={formData.conflictividad}
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                {conflictividad.map((c) => (
                  <option className="font-semibold" key={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/** CARGA DEL BANNER */}

              <div className="bg-gray-700 flex flex-col rounded-lg">
                <label
                  htmlFor="banner"
                  className="text-gray-300 text-center py-2 "
                >
                  Cargar un Banner
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="py-4 px-4   text-sm text-gray-300"
                />
              </div>
            </div>
          </div>

          <button
            className="w-full my-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Cargar
          </button>
        </form>

      </div>
      {msg &&  <Alerta mensaje={mensaje}/>}
     
    </>
  );
};
