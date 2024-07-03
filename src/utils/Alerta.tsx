import { Mensaje } from "./interfaces/mensaje";


export const Alerta = ({ mensaje } : Mensaje | any) => {
  const { error, msg } = mensaje;
  return (
    <div>
      {error ? (
        <div className="w-full text-white font-bold text-base p-4 my-4 text-center rounded-sm uppercase bg-gradient-to-r from-red-600 to-red-400 shadow-md">
          {msg}
        </div>
      ) : (
        <div className="w-full text-white font-bold text-base p-4 my-4 text-center rounded-sm uppercase bg-gradient-to-r from-green-600 to-green-400 shadow-md">
          {msg}
        </div>
      )}
    </div>
  );
};
