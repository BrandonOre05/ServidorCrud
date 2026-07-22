import { IncomingMessage, ServerResponse } from "http";
import { routerUsuarios } from "./usuariosRouter";
import { routerProductos } from "./productosRouter";

export async function router(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Manejar preflight requests (OPTIONS)
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = req.url ?? "";

    try {
        // Enrutar a los diferentes routers
        if (url.startsWith("/usuarios")) {
            await routerUsuarios(req, res);
            return;
        }

        if (url.startsWith("/productos")) {
            await routerProductos(req, res);
            return;
        }

        // Ruta no encontrada
        res.writeHead(404);
        res.end(JSON.stringify({
            success: false,
            error: "Ruta no encontrada",
            message: `La ruta ${url} no existe`
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