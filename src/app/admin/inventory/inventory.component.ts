  import { Component } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { HttpClientModule } from '@angular/common/http';  // Asegúrate de incluir HttpClientModule
import { modifierPhases } from '@popperjs/core';

  @Component({
    selector: 'app-inventory',
    standalone: true,
    imports: [FormsModule, CommonModule,HttpClientModule],
    templateUrl: './inventory.component.html',
    styleUrl: './inventory.component.scss'
  })
  export class InventoryComponent {

    productos: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
      this.loadProductos();
    }

    loadProductos() {
      // Hacer la solicitud GET al servidor Flask para obtener los productos
      this.http.get<any[]>('http://localhost:5000/productos').subscribe(
        (data) => {
          console.log('Productos obtenidos:', data);
          this.productos = data; // Asignar los productos a la variable de la clase
        },
        (error) => {
          console.error('Error al obtener productos', error);
        }
      );
    }

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
   
    saveProduct(producto: any) {
      // Enviar solicitud PUT para actualizar el producto
      this.http.put(`http://localhost:5000/productos/${producto.id_producto}`, producto).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
          // Aquí puedes actualizar el producto localmente en la lista
          const index = this.productos.findIndex(p => p.id_producto === producto.id_producto);
          if (index !== -1) {
            this.productos[index] = producto;
            this.loadProductos();
            
            // ALEMAN ayudame a borrar los datos del formulario y a que se quite cuando ya se haya guardado
          }
        },
        (error) => {
          console.error('Error al actualizar producto', error);
        }
      );
    }

    addProduct() {
      // Enviar solicitud POST al servidor para añadir el producto
      this.http.post('http://localhost:5000/productos', this.newProduct).subscribe(
        (response) => {
          console.log('Producto añadido:', response);
          this.productos.push({ ...this.newProduct });
          // .clearForm();
          this.loadProductos();

          alert(`Producto ${this.newProduct} guardado con éxito.`);

        },
        (error) => {
          console.error('Error al añadir producto', error);
        }
      );
    }

  clearForm() {
    // Limpiar el formulario
    this.newProduct = {
      nombre: '',
      imagen: '',
      precio: 0,
      cantidad: 0,
      descripcion: '',
      fabricante: '',

    };
  }
    deleteProduct(id: number) {
      // Enviar una solicitud DELETE al servidor para eliminar el producto
      this.http.delete(`http://localhost:5000/productos/${id}`).subscribe(
        (response) => {
          console.log('Producto eliminado:', response);
          // Eliminar el producto de la lista local después de una eliminación exitosa
          this.productos = this.productos.filter(p => p.id_producto !== id);
        },
        (error) => {
          console.error('Error al eliminar producto', error);
        }
      );
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