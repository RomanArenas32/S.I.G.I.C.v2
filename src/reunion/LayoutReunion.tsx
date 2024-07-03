import { Outlet } from "react-router-dom";
import { Navegacion } from "../navegacion";

export const LayoutReunion = () => {
  return (
    <>
      <Navegacion />
      <Outlet />
    </>
  );
};
