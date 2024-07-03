import { useNavigate } from "react-router-dom";

export const BotonVolver = () => {
  const navigate = useNavigate();

  const volverAtras = () => {
    navigate(-1);
  };

  return (
    <div className="px-6 py-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => volverAtras()}
      >
        Volver
      </button>
    </div>
  );
};
