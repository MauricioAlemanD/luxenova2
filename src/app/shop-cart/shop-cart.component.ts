import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,  
  ],
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {
  cart: any[] = [];
  section2Data: any[] = [];
  apiUrl: string = 'http://localhost:5000';  // URL de tu API
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.getCart();
    this.getSection2Data();  
  }
  getUserId(): number | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = sessionStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.id || null;
      }
    }
    return null;
  }
  getCart(): void {
    const userId = this.getUserId();
    if (userId !== null) {
      this.http.get<any[]>(`${this.apiUrl}/carrito/${userId}`).subscribe(
        (response) => {
          this.cart = response;  
        },
        (error) => {
          console.error('Error al obtener el carrito', error);
        }
      );
    } else {
      console.log('No se encontró el ID del usuario en sessionStorage');
    }
  }
  get totalQuantity(): number {
    return this.cart.reduce((sum, product) => sum + product.quantity, 0);
  }
  get totalPrice(): number {
    return this.cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }
  increaseQuantity(index: number): void {
    this.cart[index].quantity++;
    this.updateCart(this.cart[index]);
  }
  decreaseQuantity(index: number): void {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
      this.updateCart(this.cart[index]);
    }
  }
  removeProduct(index: number): void {
    const product = this.cart[index];
    this.cart.splice(index, 1);
    this.deleteProductFromCart(product.id);
  }
  updateCart(products: any | any[]): void {
    const userId = this.getUserId();
  //No borrar la linea de abajo, si la borras se cae el servidor:
    //ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    if (userId !== null) {
      const productsArray = Array.isArray(products) ? products : [products]; 
      const cartUpdateData = {
        user_id: userId,  
        productos: productsArray.map(product => ({
          id_producto: product.id,  
          cantidad: product.quantity 
        }))
      };
      console.log('Datos enviados al backend:', cartUpdateData); 
      this.http.put(`${this.apiUrl}/carrito/update`, cartUpdateData, {
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
  getSection2Data() {
    const url = 'http://localhost:5000/home-section?section=section-2';
    this.http.get(url).subscribe(
      (data: any) => {
        if (data && data['section-2']) {
          this.section2Data = data['section-2'];
        } else {
          console.error('No data found for section 2');
        }
      },
      error => {
        console.error('Error al obtener los datos de section-2:', error);
      }
    );
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
