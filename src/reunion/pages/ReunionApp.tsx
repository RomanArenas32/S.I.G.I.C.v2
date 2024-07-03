import { Link } from "react-router-dom";
import { BotonVolver } from "../../utils";

export const ReunionApp = () => {
  return (
    <>
      <BotonVolver />
      <div className="px-6 mb-56 min-h-full">
        <header className="w-full text-center font-bold uppercase p-10">
          <h2 className="text-3xl">oficina de reunion</h2>
          <h5>superintendencia de inteligencia criminal</h5>
        </header>

        <div className="flex gap-4 flex-col md:flex-row">
          <button className="h-16 relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
            <Link to="../reunion/carga">cargar evento</Link>
          </button>
          <button className="h-16 relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
            <Link to="../reunion/vista">Vista de datos</Link>
          </button>
          <button className="h-16 relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
            <Link to="../reunion/formularios">Gestionar Formularios</Link>
          </button>
        </div>
      </div>
    </>
  );
};
