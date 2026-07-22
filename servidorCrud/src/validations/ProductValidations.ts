export const validarProductos = (id: number, nombre: string, precio: number, stock: number): void => {
    // Validar ID
    if (isNaN(id)) throw new Error("El ID debe ser un número");
    if (!Number.isInteger(id)) throw new Error("El ID debe ser un número entero");
    if (id < 0) throw new Error("El ID no puede ser negativo");

    // Validar nombre
    if (nombre.trim() === "") throw new Error("El nombre no puede estar vacío");
    if (nombre.trim().length < 3) throw new Error("El nombre debe tener al menos 3 caracteres");

    // Validar precio
    if (isNaN(precio)) throw new Error("El precio debe ser un número");
    if (precio < 0) throw new Error("El precio no puede ser negativo");

    // Validar stock
    if (isNaN(stock)) throw new Error("El stock debe ser un número");
    if (!Number.isInteger(stock)) throw new Error("El stock debe ser un número entero");
    if (stock < 0) throw new Error("El stock no puede ser negativo");
}

export const validarIdProducto = (id: number): void => {
    if (isNaN(id)) throw new Error("El ID debe ser un número");
    if (id < 0) throw new Error("El ID no puede ser negativo");
    if (!Number.isInteger(id)) throw new Error("El ID debe ser un número entero");
}