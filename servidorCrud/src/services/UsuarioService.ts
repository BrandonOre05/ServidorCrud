import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../data/UsuarioRepository.js";
import { validarUsuarios, validarIdUsuario } from "../validations/UserValidations.js";

export class UsuarioService {
    private repository = new UsuarioRepository();

    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuario();
    }

    async agregar(usuario: Usuario): Promise<void> {
        const usuarios = await this.repository.obtenerUsuario();

        // Validar ID único
        const existeId = usuarios.some(u => u.id === usuario.id);
        if (existeId) {
            throw new Error("El ID ya está registrado");
        }

        // Validar correo único
        const existeCorreo = usuarios.some(u => u.correo === usuario.correo);
        if (existeCorreo) {
            throw new Error("El correo ya está registrado");
        }

        // Validar datos
        validarUsuarios(usuario.id, usuario.nombre, usuario.apellido, usuario.edad,
            usuario.correo, usuario.contraseña, usuario.rol, usuario.estado);

        usuarios.push(usuario);
        await this.repository.guardarUsuario(usuarios);
        console.log("Usuario agregado correctamente.");
    }

    async buscar(id: number): Promise<Usuario> {
        const usuarios = await this.repository.obtenerUsuario();
        validarIdUsuario(id);
        const usuario = usuarios.find(u => u.id === id);
        if (!usuario) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }

    async actualizar(usuario: Usuario): Promise<void> {
        const usuarios = await this.repository.obtenerUsuario();
        const indice = usuarios.findIndex(u => u.id === usuario.id);

        if (indice === -1) {
            throw new Error(`Usuario con ID ${usuario.id} no encontrado`);
        }

        validarUsuarios(usuario.id, usuario.nombre, usuario.apellido, usuario.edad,
            usuario.correo, usuario.contraseña, usuario.rol, usuario.estado);

        usuarios[indice] = usuario;
        await this.repository.guardarUsuario(usuarios);
        console.log("Usuario actualizado correctamente.");
    }

    async eliminar(id: number): Promise<void> {
        const usuarios = await this.repository.obtenerUsuario();
        validarIdUsuario(id);

        const nuevos = usuarios.filter(u => u.id !== id);
        if (nuevos.length === usuarios.length) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }

        await this.repository.guardarUsuario(nuevos);
        console.log("Usuario eliminado correctamente.");
    }
}