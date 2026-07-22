import { readFile, writeFile } from "fs/promises";
import { Usuario } from "../models/Usuario";

export class UsuarioRepository {
    private ruta = "./src/data/usuarios.json";

    async obtenerUsuario(): Promise<Usuario[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return [];
        }
    }

    async guardarUsuario(usuarios: Usuario[]): Promise<void> {
        try {
            await writeFile(this.ruta, JSON.stringify(usuarios, null, 4));
        } catch (error) {
            console.error("Error al guardar el usuario");
            throw error;
        }
    }
}