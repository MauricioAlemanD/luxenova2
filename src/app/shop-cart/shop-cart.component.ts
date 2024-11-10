import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.scss'
})
export class ShopCartComponent {

  constructor(private router: Router) { }

  // Carrito de compras (productos con cantidad y precio)
  cart = [
    { id: 1, name: 'Producto 1', price: 10, quantity: 1, imageUrl: 'assets/img/products/producto-1.jpg' },
    { id: 2, name: 'Producto 2', price: 20, quantity: 2, imageUrl: 'assets/img/products/producto-2.jpg' },
    { id: 3, name: 'Producto 3', price: 30, quantity: 1, imageUrl: 'assets/img/products/producto-3.jpg' },
    // Más productos...
  ];

  // Obtener la cantidad total de productos
  get totalQuantity(): number {
    return this.cart.reduce((sum, product) => sum + product.quantity, 0);
  }

  // Obtener el precio total de todos los productos
  get totalPrice(): number {
    return this.cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }

  // Aumentar la cantidad de un producto
  increaseQuantity(index: number): void {
    this.cart[index].quantity++;
  }

  // Disminuir la cantidad de un producto (sin bajar de 1)
  decreaseQuantity(index: number): void {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
    }
  }

  // Eliminar un producto del carrito
  removeProduct(index: number): void {
    this.cart.splice(index, 1);
  }

  // Función para ir a la página de compra (simulación)
  goToCheckout(): void {    
    this.router.navigate(['/carrito/compra']);  // Redirige a la ruta /carrito/compra
  }

}
