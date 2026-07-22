import promptSync from 'prompt-sync';
import { cargarProductos, cargarClientes } from './utils/fileManager';
import { ProductosService } from './services/ProductoService';
import { ClientesService } from './services/clientesService';
import { ServidorCRUD } from './server/server';
import { menuProductos } from './menu/menuProductos';
import { menuClientes } from './menu/menuClientes';

const prompt = promptSync();

// Cargar datos
const productosIniciales = cargarProductos();
const clientesIniciales = cargarClientes();

// Crear servicios
const productosService = new ProductosService(productosIniciales);
const clientesService = new ClientesService(clientesIniciales);

// Crear servidor
const servidor = new ServidorCRUD(productosService, clientesService, 3000);

// Variable para controlar el estado del servidor
let servidorIniciado = false;

// Menú principal interactivo
function mostrarMenuPrincipal(): void {
    console.log('\n' + '='.repeat(60));
    console.log('   🚀 SISTEMA CRUD - PRODUCTOS Y CLIENTES');
    console.log('='.repeat(60));
    console.log(`   Servidor: ${servidorIniciado ? '🟢 Activo' : '🔴 Detenido'}`);
    console.log('='.repeat(60));
    console.log('1. 🌐 Iniciar servidor HTTP');
    console.log('2. 🛑 Detener servidor HTTP');
    console.log('3. 📦 Gestionar Productos');
    console.log('4. 👤 Gestionar Clientes');
    console.log('5. 📊 Ver estado del sistema');
    console.log('0. ❌ Salir');
    console.log('='.repeat(60));
}

function verEstadoSistema(): void {
    console.log('\n📊 === ESTADO DEL SISTEMA ===');
    console.log(`🟢 Servidor: ${servidorIniciado ? 'Activo' : 'Detenido'}`);
    console.log(`📦 Productos: ${productosService.obtenerTodos().length}`);
    console.log(`👤 Clientes: ${clientesService.obtenerTodos().length}`);

    const productosActivos = productosService.obtenerTodos().filter(p => p.estado === 'activo').length;
    const clientesActivos = clientesService.obtenerTodos().filter(c => c.estado === 'activo').length;
    console.log(`✅ Productos activos: ${productosActivos}`);
    console.log(`✅ Clientes activos: ${clientesActivos}`);
}

function main(): void {
    let continuar = true;

    while (continuar) {
        mostrarMenuPrincipal();
        const opcion = prompt('Seleccione una opción: ');

        switch (opcion) {
            case '1':
                if (!servidorIniciado) {
                    servidor.iniciar();
                    servidorIniciado = true;
                } else {
                    console.log('ℹ️ El servidor ya está iniciado.');
                }
                break;

            case '2':
                if (servidorIniciado) {
                    servidor.detener();
                    servidorIniciado = false;
                } else {
                    console.log('ℹ️ El servidor ya está detenido.');
                }
                break;

            case '3':
                menuProductos(productosService);
                break;

            case '4':
                menuClientes(clientesService);
                break;

            case '5':
                verEstadoSistema();
                break;

            case '0':
                if (servidorIniciado) {
                    console.log('🛑 Deteniendo servidor...');
                    servidor.detener();
                }
                console.log('👋 ¡Hasta luego!');
                continuar = false;
                break;

            default:
                console.log('❌ Opción no válida. Intente de nuevo.');
        }
    }
}

// Capturar Ctrl+C para salir graceful
process.on('SIGINT', () => {
    console.log('\n\n🛑 Interrupción recibida. Cerrando...');
    if (servidorIniciado) {
        servidor.detener();
    }
    process.exit(0);
});

console.log('\n🚀 Bienvenido al Sistema CRUD con Node.js Nativo');
console.log('📚 Cargando datos...');

// Iniciar aplicación
main();