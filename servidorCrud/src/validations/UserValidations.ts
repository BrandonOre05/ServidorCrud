export const validarUsuarios = (
    id: number, 
    nombre: string, 
    apellido: string, 
    edad: number, 
    correo: string, 
    contraseña: string, 
    rol: string, 
    estado: string
): void => {
    // Validar ID
    if (isNaN(id)) throw new Error("El ID debe ser un número");
    if (!Number.isInteger(id)) throw new Error("El ID debe ser un número entero");
    if (id < 0) throw new Error("El ID no puede ser negativo");

    // Validar nombre
    if (nombre.trim() === "") throw new Error("El nombre no puede estar vacío");
    if (nombre.trim().length < 3) throw new Error("El nombre debe tener al menos 3 caracteres");

    // Validar apellido
    if (apellido.trim() === "") throw new Error("El apellido no puede estar vacío");
    if (apellido.trim().length < 3) throw new Error("El apellido debe tener al menos 3 caracteres");

    // Validar edad
    if (isNaN(edad)) throw new Error("La edad debe ser un número");
    if (!Number.isInteger(edad)) throw new Error("La edad debe ser un número entero");
    if (edad < 0) throw new Error("La edad no puede ser negativa");
    if (edad > 120) throw new Error("La edad no es válida");

    // Validar correo
    if (correo.trim() === "") throw new Error("El correo no puede estar vacío");
    const dominiosValidos = ["@gmail.com", "@hotmail.com", "@outlook.com"];
    if (!dominiosValidos.some(dominio => correo.endsWith(dominio))) {
        throw new Error("El correo debe pertenecer a un dominio válido (gmail, hotmail u outlook)");
    }

    // Validar contraseña
    if (contraseña.trim() === "") throw new Error("La contraseña no puede estar vacía");
    if (contraseña.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres");

    // Validar rol
    const rolesValidos = ["ADMIN", "USUARIO"];
    if (!rolesValidos.includes(rol.toUpperCase())) {
        throw new Error("El rol solo puede ser ADMIN o USUARIO");
    }

    // Validar estado
    const estadosValidos = ["ACTIVO", "INACTIVO", "SUSPENDIDO"];
    if (!estadosValidos.includes(estado.toUpperCase())) {
        throw new Error("El estado solo puede ser ACTIVO, INACTIVO o SUSPENDIDO");
    }
}

export const validarIdUsuario = (id: number): void => {
    if (isNaN(id)) throw new Error("El ID debe ser un número");
    if (id < 0) throw new Error("El ID no puede ser negativo");
    if (!Number.isInteger(id)) throw new Error("El ID debe ser un número entero");
}