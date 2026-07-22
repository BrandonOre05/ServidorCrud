import { UsuarioService } from "../services/UsuarioService";
import { rl } from "../utils/Readline";
import { Rol } from "../models/Rol";
import { Estado } from "../models/Estado";
import { AuthService } from "../services/AuthService";
import { ProductoService } from "../services/ProductoService";

const userService = new UsuarioService();
const productService = new ProductoService();
const auth = new AuthService();

export async function authentication() {
    let opcion: number = 0;
    let correo: string;
    let contraseña: string;
    let id: number;
    let nombre: string;
    let apellido: string;
    let edad: number;
    let rolT: string;
    let estadoT: string;

    do {
        console.log("\n===== 🔐 INICIO DE SESIÓN =====");
        console.log("1. Iniciar Sesión");
        console.log("2. Registrarse");
        console.log("3. Salir");

        opcion = Number(await rl.question("Seleccione una opción: "));
        
        switch (opcion) {
            case 1:
                correo = await rl.question("Ingrese su correo electrónico: ");
                contraseña = await rl.question("Ingrese su contraseña: ");
                await auth.login(correo, contraseña);
                await menuPrincipal();
                break;
            case 2:
                id = Number(await rl.question("Ingrese el ID del usuario: "));
                nombre = await rl.question("Ingrese el nombre del usuario: ");
                apellido = await rl.question("Ingrese el apellido del usuario: ");
                edad = Number(await rl.question("Ingrese la edad del usuario: "));
                correo = await rl.question("Ingrese el correo del usuario: ");
                contraseña = await rl.question("Ingrese la contraseña del usuario: ");
                rolT = await rl.question("Ingrese el rol del usuario (ADMIN, USUARIO): ");
                estadoT = await rl.question("Ingrese el estado del usuario (ACTIVO, INACTIVO, SUSPENDIDO): ");
                
                await auth.register({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contraseña,
                    rol: rolT.toUpperCase() as Rol,
                    estado: estadoT as Estado
                });
                break;
            case 3:
                console.log("👋 Has salido del programa.");
                break;
            default:
                console.log("❌ Opción no válida.");
                break;
        }
    } while (opcion !== 3);
}

export async function menuUsuarios() {
    let id: number;
    let nombre: string;
    let apellido: string;
    let edad: number;
    let correo: string;
    let contraseña: string;
    let rolT: string;
    let estadoT: string;
    let opcion: number = 0;

    do {
        console.log("\n===== 👤 GESTIÓN DE USUARIOS =====");
        console.log("1. Listar usuarios");
        console.log("2. Agregar usuario");
        console.log("3. Buscar usuario");
        console.log("4. Actualizar usuario");
        console.log("5. Eliminar usuario");
        console.log("6. Volver");

        opcion = Number(await rl.question("Seleccione una opción: "));

        switch (opcion) {
            case 1:
                console.table(await userService.listar());
                break;
            case 2:
                id = Number(await rl.question("Ingrese el ID del usuario: "));
                nombre = await rl.question("Ingrese el nombre del usuario: ");
                apellido = await rl.question("Ingrese el apellido del usuario: ");
                edad = Number(await rl.question("Ingrese la edad del usuario: "));
                correo = await rl.question("Ingrese el correo del usuario: ");
                contraseña = await rl.question("Ingrese la contraseña del usuario: ");
                rolT = await rl.question("Ingrese el rol del usuario (ADMIN, USUARIO): ");
                estadoT = await rl.question("Ingrese el estado del usuario (ACTIVO, INACTIVO, SUSPENDIDO): ");

                await userService.agregar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contraseña,
                    rol: rolT.toUpperCase() as Rol,
                    estado: estadoT as Estado
                });
                break;
            case 3:
                id = Number(await rl.question("Ingrese el ID del usuario a buscar: "));
                console.table(await userService.buscar(id));
                break;
            case 4:
                id = Number(await rl.question("Ingrese el ID del usuario a actualizar: "));
                nombre = await rl.question("Ingrese el nombre del usuario: ");
                apellido = await rl.question("Ingrese el apellido del usuario: ");
                edad = Number(await rl.question("Ingrese la edad del usuario: "));
                correo = await rl.question("Ingrese el correo del usuario: ");
                contraseña = await rl.question("Ingrese la contraseña del usuario: ");
                rolT = await rl.question("Ingrese el rol del usuario (ADMIN, USUARIO): ");
                estadoT = await rl.question("Ingrese el estado del usuario (ACTIVO, INACTIVO, SUSPENDIDO): ");
                
                await userService.actualizar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contraseña,
                    rol: rolT.toUpperCase() as Rol,
                    estado: estadoT as Estado
                });
                break;
            case 5:
                id = Number(await rl.question("Ingrese el ID del usuario a eliminar: "));
                await userService.eliminar(id);
                break;
            case 6:
                console.log("Volviendo al menú principal...");
                break;
            default:
                console.log("❌ Opción no válida.");
        }
    } while (opcion !== 6);
}

export async function menuProductos() {
    let id: number;
    let nombre: string;
    let precio: number;
    let stock: number;
    let opcion: number = 0;

    do {
        console.log("\n===== 📦 GESTIÓN DE PRODUCTOS =====");
        console.log("1. Listar productos");
        console.log("2. Agregar producto");
        console.log("3. Buscar producto");
        console.log("4. Actualizar producto");
        console.log("5. Eliminar producto");
        console.log("6. Volver");

        opcion = Number(await rl.question("Seleccione una opción: "));

        switch (opcion) {
            case 1:
                console.table(await productService.listar());
                break;
            case 2:
                id = Number(await rl.question("Ingrese el ID del producto: "));
                nombre = await rl.question("Ingrese el nombre del producto: ");
                precio = Number(await rl.question("Ingrese el precio del producto: "));
                stock = Number(await rl.question("Ingrese el stock del producto: "));

                await productService.agregar({ id, nombre, precio, stock });
                break;
            case 3:
                id = Number(await rl.question("Ingrese el ID del producto a buscar: "));
                console.table(await productService.buscar(id));
                break;
            case 4:
                id = Number(await rl.question("Ingrese el ID del producto a actualizar: "));
                nombre = await rl.question("Ingrese el nombre del producto: ");
                precio = Number(await rl.question("Ingrese el precio del producto: "));
                stock = Number(await rl.question("Ingrese el stock del producto: "));
                
                await productService.actualizar({ id, nombre, precio, stock });
                break;
            case 5:
                id = Number(await rl.question("Ingrese el ID del producto a eliminar: "));
                await productService.eliminar(id);
                break;
            case 6:
                console.log("Volviendo al menú principal...");
                break;
            default:
                console.log("❌ Opción no válida.");
        }
    } while (opcion !== 6);
}

export async function menuPrincipal() {
    let opcion: number = 0;
    
    do {
        console.log("\n===== 🚀 MENÚ PRINCIPAL =====");
        console.log("1. 👤 Gestionar Usuarios");
        console.log("2. 📦 Gestionar Productos");
        console.log("3. 🔐 Cerrar Sesión");
        
        opcion = Number(await rl.question("Seleccione una opción: "));
        
        switch (opcion) {
            case 1:
                await menuUsuarios();
                break;
            case 2:
                await menuProductos();
                break;
            case 3:
                console.log("👋 Cerrando sesión...");
                break;
            default:
                console.log("❌ Opción no válida.");
                break;
        }
    } while (opcion !== 3);
}