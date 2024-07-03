export interface UsuarioAutenticado {
    id?: number;
    nombre?: string;
    apellido?: string;
    legajo?: number;
    delegacion?: string;
    usuario?: string;
    rol?: string;
    estado?: boolean;
    iat?: number;
    exp?: number;
}
