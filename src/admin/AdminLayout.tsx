import { Outlet } from "react-router-dom";
import { Navegacion } from "../navegacion";

export const AdminLayout = () => {
  return (
    <>
      <Navegacion />
      <Outlet />
    </>
  );
};
