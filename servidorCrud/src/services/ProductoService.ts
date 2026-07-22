import { Producto } from "../models/Producto";
import { ProductoRepository } from "../data/ProductoRepository";
import { validarProductos, validarIdProducto } from "../validations/ProductValidations";

export class ProductoService {
    private repository = new ProductoRepository();

    async listar(): Promise<Producto[]> {
        return await this.repository.obtenerProducto();
    }

    async agregar(producto: Producto): Promise<void> {
        const productos = await this.repository.obtenerProducto();
        
        // Validar ID único
        const existeId = productos.some(p => p.id === producto.id);
        if (existeId) {
            throw new Error("El ID ya está registrado");
        }
        
        // Validar datos
        validarProductos(producto.id, producto.nombre, producto.precio, producto.stock);
        
        productos.push(producto);
        await this.repository.guardarProducto(productos);
        console.log("Producto agregado correctamente.");
    }

    async buscar(id: number): Promise<Producto> {
        const productos = await this.repository.obtenerProducto();
        validarIdProducto(id);
        const producto = productos.find(p => p.id === id);
        if (!producto) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }
        return producto;
    }

    async actualizar(producto: Producto): Promise<void> {
        const productos = await this.repository.obtenerProducto();
        const indice = productos.findIndex(p => p.id === producto.id);
        
        if (indice === -1) {
            throw new Error(`Producto con ID ${producto.id} no encontrado`);
        }
        
        validarProductos(producto.id, producto.nombre, producto.precio, producto.stock);
        
        productos[indice] = producto;
        await this.repository.guardarProducto(productos);
        console.log("Producto actualizado correctamente.");
    }

    async eliminar(id: number): Promise<void> {
        const productos = await this.repository.obtenerProducto();
        validarIdProducto(id);
        
        const nuevos = productos.filter(p => p.id !== id);
        if (nuevos.length === productos.length) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }

        await this.repository.guardarProducto(nuevos);
        console.log("Producto eliminado correctamente.");
    }
}