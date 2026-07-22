import { UsuarioService } from "./UsuarioService";
import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export class AuthService {
    private repository = new UsuarioRepository();
    private service = new UsuarioService();

    async login(correo: string, contraseña: string): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuario();
            const usuario = usuarios.find(u => u.correo === correo);
            
            if (!usuario) {
                throw new Error("Correo no encontrado");
            }
            
            if (usuario.contraseña !== contraseña) {
                throw new Error("Contraseña incorrecta");
            }
            
            console.log("✅ Sesión iniciada con éxito");
            console.log(`👤 Bienvenido ${usuario.nombre} ${usuario.apellido}`);
            
        } catch (error) {
            console.error("❌ No se pudo iniciar sesión");
            throw error;
        }
    }

    async register(usuario: Usuario): Promise<void> {
        await this.service.agregar(usuario);
        console.log("✅ Usuario registrado correctamente");
    }
}