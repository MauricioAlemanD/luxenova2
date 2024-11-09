import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  productos = [
    // Ejemplo de productos
    { id_producto: 1, nombre: 'Producto 1', precio: 100, cantidad: 50, descripcion: 'Descripción del producto 1', fabricante: 'Fabricante 1', fecha_creacion: new Date() },
    { id_producto: 2, nombre: 'Producto 2', precio: 200, cantidad: 30, descripcion: 'Descripción del producto 2', fabricante: 'Fabricante 2', fecha_creacion: new Date() },
    { id_producto: 2, nombre: 'Producto 2', precio: 200, cantidad: 30, descripcion: 'Descripción del producto 2', fabricante: 'Fabricante 2', fecha_creacion: new Date() },
    { id_producto: 2, nombre: 'Producto 2', precio: 200, cantidad: 30, descripcion: 'Descripción del producto 2', fabricante: 'Fabricante 2', fecha_creacion: new Date() },
    { id_producto: 2, nombre: 'Producto 2', precio: 200, cantidad: 30, descripcion: 'Descripción del producto 2', fabricante: 'Fabricante 2', fecha_creacion: new Date() },
    { id_producto: 2, nombre: 'Producto 2', precio: 200, cantidad: 30, descripcion: 'Descripción del producto 2', fabricante: 'Fabricante 2', fecha_creacion: new Date() },
  ];

  newProduct = {
    nombre: '',
    precio: 0,
    cantidad: 0,
    descripcion: '',
    fabricante: ''
  };

  // Abrir el modal de añadir producto
  openAddProductModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('addProductModal'));
    modal.show();
  }

  // Añadir un nuevo producto
  addProduct() {
    const nuevoProducto = {
      ...this.newProduct,
      id_producto: this.productos.length + 1,
      fecha_creacion: new Date()
    };
    this.productos.push(nuevoProducto);

    // Limpiar el formulario y cerrar el modal
    this.newProduct = { nombre: '', precio: 0, cantidad: 0, descripcion: '', fabricante: '' };
    const modal = new (window as any).bootstrap.Modal(document.getElementById('addProductModal'));
    modal.hide();
  }

  // Guardar cambios en un producto existente
  saveProduct(producto: any) {
    // Aquí puedes agregar lógica para guardar el producto en una base de datos
    alert(`Producto "${producto.nombre}" guardado con éxito.`);
  }

  // Eliminar un producto
  deleteProduct(id: number) {
    this.productos = this.productos.filter(p => p.id_producto !== id);
  }

  // Función para manejar la subida de imagen (sin funcionalidad)
  onImageUpload(event: any) {
    const file = event.target.files[0];
    console.log('Archivo de imagen seleccionado:', file);
    // Aquí puedes añadir la lógica para manejar la subida de la imagen
  }
}
