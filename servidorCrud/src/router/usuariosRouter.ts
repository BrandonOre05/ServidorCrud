import { IncomingMessage, ServerResponse } from "http";
import { UsuarioService } from "../services/UsuarioService";
import { validarIdUsuario } from "../validations/UserValidations";

const service = new UsuarioService();

export async function routerUsuarios(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {
        // GET /usuarios - Listar todos
        if (metodo === "GET" && url === "/usuarios") {
            const usuarios = await service.listar();
            res.writeHead(200);
            res.end(JSON.stringify({
                success: true,
                data: usuarios,
                total: usuarios.length
            }));
            return;
        }

        // POST /usuarios - Crear usuario
        if (metodo === "POST" && url === "/usuarios") {
            let body = "";
            req.on("data", chunk => { body += chunk; });
            req.on("end", async () => {
                try {
                    const usuario = JSON.parse(body);
                    await service.agregar(usuario);
                    res.writeHead(201);
                    res.end(JSON.stringify({
                        success: true,
                        message: "Usuario creado exitosamente",
                        data: usuario
                    }));
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        success: false,
                        error: (error as Error).message
                    }));
                }
            });
            return;
        }

        // GET /usuarios/buscar/:id - Buscar por ID
        if (metodo === "GET" && url.startsWith("/usuarios/buscar/")) {
            try {
                const separador = url.split("/");
                const id = Number(separador[3]);
                validarIdUsuario(id);
                const usuario = await service.buscar(id);
                res.writeHead(200);
                res.end(JSON.stringify({
                    success: true,
                    data: usuario
                }));
                return;
            } catch (error) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    success: false,
                    error: (error as Error).message
                }));
            }
        }

        // PUT /usuarios - Actualizar usuario
        if (metodo === "PUT" && url === "/usuarios") {
            let body = "";
            req.on("data", chunk => { body += chunk; });
            req.on("end", async () => {
                try {
                    const usuario = JSON.parse(body);
                    await service.actualizar(usuario);
                    res.writeHead(200);
                    res.end(JSON.stringify({
                        success: true,
                        message: "Usuario actualizado correctamente",
                        data: usuario
                    }));
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        success: false,
                        error: (error as Error).message
                    }));
                }
            });
            return;
        }

        // DELETE /usuarios/delete/:id - Eliminar usuario
        if (metodo === "DELETE" && url.startsWith("/usuarios/delete/")) {
            try {
                const separador = url.split("/");
                const id = Number(separador[3]);
                await service.eliminar(id);
                res.writeHead(200);
                res.end(JSON.stringify({
                    success: true,
                    message: `Usuario con ID ${id} eliminado correctamente`
                }));
            } catch (error) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    success: false,
                    error: (error as Error).message
                }));
            }
            return;
        }

        // Método no permitido
        res.writeHead(405);
        res.end(JSON.stringify({
            success: false,
            error: "Método no permitido",
            message: `El método ${metodo} no está permitido para esta ruta`
        }));

    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({
            success: false,
            error: "Error interno del servidor",
            message: (error as Error).message
        }));
    }
}