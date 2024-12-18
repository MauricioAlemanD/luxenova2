import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss'],
})

export class ComprarComponent implements OnInit {

  UID: string = '';
  cart: any[] = [];
  section2Data: any[] = [];
  paymentMethods: any[] = [];
  shippingAddresses: any[] = [];
  selectedPaymentMethod: number = 0; // Inicializar con un valor predeterminado
  selectedAddress: number = 0; // Inicializar con un valor predeterminado
  apiUrl: string = 'http://localhost:5000';  // URL de tu API

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.UID = this.getUserId();
    console.log("UID:", this.UID); // Verificar UID
    this.getCart();
    this.loadPaymentMethods();
    this.loadShippingAddresses();
  }

  getUserId(): string {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = sessionStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        return (parsedUser.id !== undefined ? parsedUser.id.toString() : '');
      }
    }
    return ''; // Devuelve una cadena vacía si no se encuentra el usuario
  }

  getCart(): void {
    if (this.UID !== '') {
      this.http.get<any[]>(`${this.apiUrl}/carrito/${this.UID}`).subscribe(
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

  getPaymentMethods(userId: string): Observable<any[]> {
    console.log("Fetching payment methods for user:", userId); // Verificar llamada
    return this.http.get<any[]>(`${this.apiUrl}/metodos_de_pago/${userId}`);
  }

  loadPaymentMethods(): void {
    if (this.UID !== '') {
      this.getPaymentMethods(this.UID).subscribe(
        (response) => {
          console.log("Payment methods response:", response); // Verificar respuesta
          this.paymentMethods = response.map(metodo => ({
            id: metodo.id_metodo_pago,
            name: `${metodo.tipo} **********${metodo.numero_tarjeta.slice(-6)}`
          }));
          if (this.paymentMethods.length > 0) {
            this.selectedPaymentMethod = this.paymentMethods[0].id;
          }
        },
        (error) => {
          console.error('Error al obtener los métodos de pago', error);
        }
      );
    } else {
      console.log('No se encontró el ID del usuario en sessionStorage');
    }
  }

  getShippingAddresses(userId: string): Observable<any[]> {
    console.log("Fetching shipping addresses for user:", userId); // Verificar llamada
    return this.http.get<any[]>(`${this.apiUrl}/direcciones/${userId}`);
  }

  loadShippingAddresses(): void {
    if (this.UID !== '') {
      this.getShippingAddresses(this.UID).subscribe(
        (response) => {
          console.log("Shipping addresses response:", response); // Verificar respuesta
          this.shippingAddresses = response.map(direccion => ({
            id: direccion.id_direccion,
            street: direccion.calle,
            exteriorNumber: direccion.numero_exterior,
            interiorNumber: direccion.numero_interior,
            neighborhood: direccion.colonia,
            city: direccion.ciudad,
            state: direccion.estado,
            postalCode: direccion.codigo_postal,
            country: direccion.pais
          }));
          if (this.shippingAddresses.length > 0) {
            this.selectedAddress = this.shippingAddresses[0].id;
          }
        },
        (error) => {
          console.error('Error al obtener las direcciones de envío', error);
        }
      );
    } else {
      console.log('No se encontró el ID del usuario en sessionStorage');
    }
  }

  completePurchase(): void {
    if (this.selectedPaymentMethod && this.selectedAddress) {
      const orderData = {
        id_usuario: this.UID,
        id_direccion: this.selectedAddress,
        productos: this.cart.map(product => ({
          id_producto: product.id,
          cantidad: product.quantity
        }))
      };

      this.http.post(`${this.apiUrl}/ordenes`, orderData).subscribe(
        (response) => {
          alert('Compra realizada con éxito');
          this.router.navigate(['/']); 
          // Limpiar el carrito u otras acciones post-compra
        },
        (error) => {
          console.error('Error al completar la compra', error);
          alert('Ocurrió un error al completar la compra');
        }
      );
    } else {
      alert('Por favor, seleccione un método de pago y una dirección de envío');
    }
  }
}
