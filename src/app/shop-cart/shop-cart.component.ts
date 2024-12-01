import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Asegúrate de importar HttpClientModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,  // Importamos HttpClientModule aquí
  ],
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  cart: any[] = [];
  apiUrl: string = 'http://localhost:5000';  // URL de tu API

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Llamar al método para obtener el carrito cuando se inicializa el componente
    this.getCart();
  }

  getUserId(): number | null {
    // Verificar si estamos en un entorno de navegador
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = sessionStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.id || null;
      }
    }
    return null;
  }
  

  // Método para obtener el carrito de compras del backend
  getCart(): void {
    const userId = this.getUserId();
    if (userId !== null) {
      this.http.get<any[]>(`${this.apiUrl}/carrito/${userId}`).subscribe(
        (response) => {
          this.cart = response;  // Llenamos el carrito con los datos obtenidos
        },
        (error) => {
          console.error('Error al obtener el carrito', error);
        }
      );
    } else {
      console.log('No se encontró el ID del usuario en sessionStorage');
    }
  }

  // Obtener la cantidad total de productos
  get totalQuantity(): number {
    return this.cart.reduce((sum, product) => sum + product.cantidad, 0);
  }

  // Obtener el precio total de todos los productos
  get totalPrice(): number {
    return this.cart.reduce((sum, product) => sum + (product.precio * product.cantidad), 0);
  }

  // Aumentar la cantidad de un producto
  increaseQuantity(index: number): void {
    this.cart[index].cantidad++;
    this.updateCart(this.cart[index]);
  }

  // Disminuir la cantidad de un producto (sin bajar de 1)
  decreaseQuantity(index: number): void {
    if (this.cart[index].cantidad > 1) {
      this.cart[index].cantidad--;
      this.updateCart(this.cart[index]);
    }
  }

  // Eliminar un producto del carrito
  removeProduct(index: number): void {
    const product = this.cart[index];
    this.cart.splice(index, 1);
    this.deleteProductFromCart(product.id);
  }

  // Método para actualizar el carrito en el backend
  updateCart(products: any[]): void {
    const userId = this.getUserId();
    if (userId !== null) {
      // Asegúrate de enviar un array de productos, cada uno con las claves correctas
      const cartUpdateData = { productos: products.map(product => ({
        id_producto: product.id,  // Asegúrate de mapear 'id' a 'id_producto'
        cantidad: product.quantity // Asegúrate de mapear 'quantity' a 'cantidad'
      })) };
  
      console.log('Datos enviados al backend:', cartUpdateData); // Para depuración
  
      this.http.put(`${this.apiUrl}/carrito/${userId}`, cartUpdateData, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        (response) => {
          console.log('Carrito actualizado:', response);
        },
        (error) => {
          console.error('Error al actualizar el carrito', error);
        }
      );
    }
  }
    
  
  
  


  // Método para eliminar un producto del carrito en el backend
  deleteProductFromCart(productId: number): void {
    const userId = this.getUserId();
    if (userId !== null) {
      this.http.delete(`${this.apiUrl}/carrito/${userId}/producto/${productId}`).subscribe(
        (response) => {
          console.log('Producto eliminado del carrito', response);
        },
        (error) => {
          console.error('Error al eliminar el producto del carrito', error);
        }
      );
    }
  }

  // Función para ir a la página de compra
  goToCheckout(): void {
    this.router.navigate(['/carrito/compra']);
  }
}
