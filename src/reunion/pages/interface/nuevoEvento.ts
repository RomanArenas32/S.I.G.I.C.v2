import { UsuarioUpdate } from "../../../admin/interfaces/usuario";

export interface NuevoEvento {
    responsable: string;
    partido: string;
    localidad: string;
    tipo: string;
    subtipo: string;
    programacion: string;
    infoDelegacion: string;
    infoReunion: string;
    extracto: string;
    fecha: string;
    hora: string;
    coordenadas: string;
    lugar: string;
    barrio: string;
    conflictividad: string;
    banner: Blob | string;
    org: string[];
    usuarioAuth: UsuarioUpdate;
}