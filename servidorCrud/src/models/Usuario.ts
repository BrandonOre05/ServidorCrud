import { Rol } from "./Rol";
import { Estado } from "./Estado";

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    correo: string;
    contraseña: string;
    rol: Rol;
    estado: Estado;
}