import { IncomingMessage, ServerResponse } from "http";
import { ProductoService } from "../services/ProductoService.js";
import { validarIdProducto } from "../validations/ProductValidations";

const service = new ProductoService();

export async function routerProductos(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {
        // GET /productos - Listar todos
        if (metodo === "GET" && url === "/productos") {
            const productos = await service.listar();
            res.writeHead(200);
            res.end(JSON.stringify({
                success: true,
                data: productos,
                total: productos.length
            }));
            return;
        }

        // POST /productos - Crear producto
        if (metodo === "POST" && url === "/productos") {
            let body = "";
            req.on("data", chunk => { body += chunk; });
            req.on("end", async () => {
                try {
                    const producto = JSON.parse(body);
                    await service.agregar(producto);
                    res.writeHead(201);
                    res.end(JSON.stringify({
                        success: true,
                        message: "Producto creado exitosamente",
                        data: producto
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

        // GET /productos/buscar/:id - Buscar por ID
        if (metodo === "GET" && url.startsWith("/productos/buscar/")) {
            try {
                const separador = url.split("/");
                const id = Number(separador[3]);
                validarIdProducto(id);
                const producto = await service.buscar(id);
                res.writeHead(200);
                res.end(JSON.stringify({
                    success: true,
                    data: producto
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

        // PUT /productos - Actualizar producto
        if (metodo === "PUT" && url === "/productos") {
            let body = "";
            req.on("data", chunk => { body += chunk; });
            req.on("end", async () => {
                try {
                    const producto = JSON.parse(body);
                    await service.actualizar(producto);
                    res.writeHead(200);
                    res.end(JSON.stringify({
                        success: true,
                        message: "Producto actualizado correctamente",
                        data: producto
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

        // DELETE /productos/delete/:id - Eliminar producto
        if (metodo === "DELETE" && url.startsWith("/productos/delete/")) {
            try {
                const separador = url.split("/");
                const id = Number(separador[3]);
                await service.eliminar(id);
                res.writeHead(200);
                res.end(JSON.stringify({
                    success: true,
                    message: `Producto con ID ${id} eliminado correctamente`
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