import { Route, Routes } from "react-router-dom";
import { Login } from "../autenticacion";
import { LayoutReunion } from "../reunion";
import { CargarEventos, ReunionApp } from "../reunion/pages";
import { AdminLayout } from "../admin";
import { AdminApp } from "../admin/pages";
import {
  CrearUsuario,
  GestionUsuarios,
  ListaEfectivosActivos,
  ListaEfectivosInactivos,
} from "../admin/gestionUsuarios";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export const AppRoutes = () => {
  const { usuarioAuth }: any | undefined = useContext(AuthContext);
  return (
    <Routes>
      {usuarioAuth.rol === "USER_ROLE" ||
      usuarioAuth.rol === "ADMIN_ROLE" ||
      usuarioAuth.rol === "SUPERADMIN_ROLE" ? (
        <>
          {/* Rutas de administrador */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminApp />} />
            <Route path="gestion" element={<GestionUsuarios />} />
            <Route path="gestion/crear" element={<CrearUsuario />} />
            <Route path="gestion/activos" element={<ListaEfectivosActivos />} />
            <Route path="gestion/inactivos" element={<ListaEfectivosInactivos />} />
          </Route>

          {/* Rutas de reunión */}
          <Route path="/reunion" element={<LayoutReunion />}>
            <Route index element={<ReunionApp />} />
            <Route path="carga" element={<CargarEventos />} />
            <Route path="*" element={<ReunionApp />} />
          </Route>

          {/* Ruta predeterminada */}
          <Route path="/*" element={<ReunionApp />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </>
      )}
    </Routes>
  );
};