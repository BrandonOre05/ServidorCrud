import { authentication } from "./menu/MenuPrincipal";
import "./server/server";

async function main() {
    await authentication();
}

main();

// Capturar Ctrl+C para salir graceful
process.on('SIGINT', () => {
    console.log('\n\nCerrando aplicación...');
    process.exit(0);
});