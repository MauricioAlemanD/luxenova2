import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comprar.component.html',
  styleUrl: './comprar.component.scss'
})
export class ComprarComponent {
  // Datos de los productos en el carrito
  cart = [
    { name: 'Producto 1', price: 10, quantity: 1 },
    { name: 'Producto 2', price: 20, quantity: 2 },
    { name: 'Producto 3', price: 30, quantity: 1 },
  ];

  // Métodos de pago disponibles
  paymentMethods = [
    { id: 1, name: 'Tarjeta de crédito' },
    { id: 2, name: 'PayPal' },
    { id: 3, name: 'Transferencia bancaria' }
  ];

  // Direcciones de envío disponibles
  shippingAddresses = [
    { id: 1, street: 'Calle 1', city: 'Ciudad 1', state: 'Estado 1' },
    { id: 2, street: 'Calle 2', city: 'Ciudad 2', state: 'Estado 2' }
  ];

  // Inicializar las propiedades de selección con valores predeterminados
  selectedPaymentMethod: number = this.paymentMethods[0]?.id; // Inicializa con el primer método de pago
  selectedAddress: number = this.shippingAddresses[0]?.id;   // Inicializa con la primera dirección de envío

  // Obtener la cantidad total de artículos
  get totalQuantity(): number {
    return this.cart.reduce((sum, product) => sum + product.quantity, 0);
  }

  // Obtener el valor total de la compra
  get totalPrice(): number {
    return this.cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }

  // Función para completar la compra
  completePurchase(): void {
    if (this.selectedPaymentMethod && this.selectedAddress) {
      alert('Compra realizada con éxito');
      // Aquí puedes implementar la lógica para procesar la compra
      // Por ejemplo, enviar los datos de la compra a un servidor
    } else {
      alert('Por favor, seleccione un método de pago y una dirección de envío');
    }
  }
}
