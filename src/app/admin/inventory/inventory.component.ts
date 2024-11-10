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
    { id_producto: 1, nombre: 'Producto 1', imagen: 'src/assets/img/img-1.jpg', precio: 100, cantidad: 50, descripcion: 'Descripción del producto 1', fabricante: 'Fabricante 1', fecha_creacion: new Date() },
    { id_producto: 2, nombre: 'Producto 2', imagen: 'src/assets/img/img-2.jpg', precio: 200, cantidad: 30, descripcion: 'Descripción del producto 2', fabricante: 'Fabricante 2', fecha_creacion: new Date() },
    // Otros productos...
  ];

  newProduct = {
    nombre: '',
    imagen: '',
    precio: 0,
    cantidad: 0,
    descripcion: '',
    fabricante: ''
  };

  openAddProductModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('addProductModal'));
    modal.show();
  }

  addProduct() {
    const nuevoProducto = {
      ...this.newProduct,
      id_producto: this.productos.length + 1,
      fecha_creacion: new Date()
    };
    this.productos.push(nuevoProducto);

    // Limpiar el formulario y cerrar el modal
    this.newProduct = { nombre: '', imagen: '', precio: 0, cantidad: 0, descripcion: '', fabricante: '' };
    const modal = new (window as any).bootstrap.Modal(document.getElementById('addProductModal'));
    modal.hide();
  }

  saveProduct(producto: any) {
    alert(`Producto "${producto.nombre}" guardado con éxito.`);
  }

  deleteProduct(id: number) {
    this.productos = this.productos.filter(p => p.id_producto !== id);
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newProduct.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
