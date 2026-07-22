// server.ts
import { createServer } from "http";
import { router } from "../router/router";

const servidor = createServer(async (req, res) => {
    await router(req, res);
});

servidor.listen(3000, () => {
    console.log("\n================================");
    console.log("🚀 Servidor HTTP Iniciado");
    console.log("📡 http://localhost:3000");
    console.log("\n📋 Endpoints disponibles:");
    console.log("  👤 /usuarios (GET, POST)");
    console.log("  👤 /usuarios/buscar/:id (GET)");
    console.log("  👤 /usuarios (PUT)");
    console.log("  👤 /usuarios/delete/:id (DELETE)");
    console.log("  📦 /productos (GET, POST)");
    console.log("  📦 /productos/buscar/:id (GET)");
    console.log("  📦 /productos (PUT)");
    console.log("  📦 /productos/delete/:id (DELETE)");
    console.log("================================");
});