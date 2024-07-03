export interface UsuarioCreate {
    nombre?: string;
    apellido?: string;
    legajo?: string;
    delegacion?: string;
    usuario?: string;
    password?: string;
    rol?: string;
    estado?: boolean;
}

export interface UsuarioUpdate {
    nombre?: string;
    apellido?: string;
    legajo?: string;
    delegacion?: string;
    rol?: string;
    estado?: boolean;
}
