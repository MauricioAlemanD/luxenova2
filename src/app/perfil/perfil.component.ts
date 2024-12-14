import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service.service';

interface Order {
  id_orden: number;
  fecha_orden: string;
  productos: { id_producto: number, cantidad: number }[];
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  paymentMethods: any[] = [];
  addresses: any[] = [];
  orders: any[] = [];

  private apiUrl = 'http://localhost:5000'; // URL de tu API

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/ingreso']);  // Redirige si no está autenticado
    } else {
      const user = sessionStorage.getItem('user');  // Obtiene el objeto user de sessionStorage
      if (user) {
        const userObj = JSON.parse(user);  // Parsea el objeto user
        this.loadPaymentMethods(userObj.id);  // Carga métodos de pago
        this.loadAddresses(userObj.id);  // Carga direcciones
        this.loadOrders(userObj.id);  // Carga las órdenes
      }
    }
  }

  loadPaymentMethods(userId: string) {
    this.http.get<any>(`${this.apiUrl}/metodos_de_pago/${userId}`).subscribe(
      (data) => {
        this.paymentMethods = data;
      },
      (error) => {
        console.error('Error al cargar los métodos de pago:', error);
      }
    );
  }

  loadAddresses(userId: string) {
    this.http.get<any>(`${this.apiUrl}/direcciones/${userId}`).subscribe(
      (data) => {
        this.addresses = data;
      },
      (error) => {
        console.error('Error al cargar las direcciones:', error);
      }
    );
  }

  loadOrders(userId: string) {
    this.http.get<any>(`${this.apiUrl}/ordenes/${userId}`).subscribe(
      (data) => {
        // Aseguramos que 'data.ordenes' es un arreglo de tipo Order[]
        this.orders = data.ordenes.map((order: Order) => {
          return {
            orderId: order.id_orden.toString(), // Usamos el id_orden como orderId
            productName: `Producto ${order.productos[0].id_producto}`, // Creamos un nombre de producto con id_producto
            orderDate: new Date(order.fecha_orden).toISOString() // Convertimos la fecha a formato ISO
          };
        });
      },
      (error) => {
        console.error('Error al cargar las órdenes:', error);
      }
    );
  }

  // Métodos para editar, agregar y eliminar métodos de pago y direcciones

  editProfile() {
    alert('Editar perfil');
  }

  addPaymentMethod() {
    alert('Añadir método de pago');
  }

  removePaymentMethod(card: any) {
    this.paymentMethods = this.paymentMethods.filter(c => c !== card);
  }

  addAddress() {
    const newAddress = {
      calle: 'Nueva Calle',
      numero_exterior: '456',
      colonia: 'Colonia Nueva',
      ciudad: 'Ciudad Nueva',
      estado: 'Estado Nuevo',
      codigo_postal: '12345',
      pais: 'México'
    };
    this.http.post<any>(`${this.apiUrl}/direcciones/${'user_id'}`, newAddress).subscribe(
      (data) => {
        this.addresses.push(data); // Agregar la nueva dirección al array
      },
      (error) => {
        console.error('Error al agregar la dirección:', error);
      }
    );
  }

  removeAddress(address: any) {
    this.http.delete<any>(`${this.apiUrl}/direcciones/${'user_id'}/${address.id_direccion}`).subscribe(
      () => {
        this.addresses = this.addresses.filter(a => a.id_direccion !== address.id_direccion); // Eliminar dirección del array
      },
      (error) => {
        console.error('Error al eliminar la dirección:', error);
      }
    );
  }

  editPaymentMethod(card: any) {
    // Lógica para editar el método de pago
  }

  // Métodos de sesión y datos de usuario

  getUserRole(): string {
    if (typeof window !== 'undefined' && sessionStorage) {
      let role = sessionStorage.getItem('role');
      if (role === 'owner') {
        return 'Propietario';
      } else if (role === 'admin') {
        return 'Administrador';
      }
      return role ? role : '';
    }
    return '';
  }

  getUserNameData() {
    if (typeof window !== 'undefined' && sessionStorage) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user).first_name : '';
    }
    return '';
  }

  getUserLastNameData() {
    if (typeof window !== 'undefined' && sessionStorage) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user).last_name : '';
    }
    return '';
  }

  getUserEmailData() {
    if (typeof window !== 'undefined' && sessionStorage) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user).email : '';
    }
    return '';
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && sessionStorage) {
      let pass: boolean = false;
      let role = sessionStorage.getItem('role');
      
      if (role === 'owner' || role === 'admin') {
        pass = true;
      } else {
        pass = false;
      }
    
      return pass;
    }
    return false;
  }

  isOwnerIn(): boolean {
    if (typeof window !== 'undefined' && sessionStorage) {
      let pass: boolean = false;
      let role = sessionStorage.getItem('role');
      
      if (role === 'owner') {
        pass = true;
      } else {
        pass = false;
      }
    
      return pass;
    }
    return false;
  }
}
