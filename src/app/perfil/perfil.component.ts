import { Component, OnInit, Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:5000'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener métodos de pago
  getPaymentMethods(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/metodos_de_pago/${userId}`);
  }

  // Obtener direcciones
  getAddresses(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/direcciones/${userId}`);
  }

  // Agregar una nueva dirección (si es necesario)
  addAddress(userId: string, address: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/direcciones/${userId}`, address);
  }

  // Eliminar una dirección
  removeAddress(userId: string, addressId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/direcciones/${userId}/${addressId}`);
  }
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [PaymentService] // Proveedor del servicio
})
export class PerfilComponent implements OnInit {
  paymentMethods: any[] = [];
  addresses: any[] = [];
  orders = [
    { orderId: '001', productName: 'Producto 1', orderDate: '2024-11-01' },
    { orderId: '002', productName: 'Producto 2', orderDate: '2024-10-25' }
  ];

  constructor(private authService: AuthService, private router: Router, private paymentService: PaymentService) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/ingreso']);  // Redirige a /ingreso si no está autenticado
    } else {
      const user = sessionStorage.getItem('user');  // Obtiene el objeto user de sessionStorage
      if (user) {
        const userObj = JSON.parse(user);  // Parsea el objeto user
        this.loadPaymentMethods(userObj.id);  // Carga los métodos de pago
        this.loadAddresses(userObj.id);  // Carga las direcciones
      }
    }
  }

  loadPaymentMethods(userId: string) {
    this.paymentService.getPaymentMethods(userId).subscribe(
      (data) => {
        this.paymentMethods = data;
      },
      (error) => {
        console.error('Error al cargar los métodos de pago:', error);
      }
    );
  }

  loadAddresses(userId: string) {
    this.paymentService.getAddresses(userId).subscribe(
      (data) => {
        this.addresses = data;
        console.log(this.addresses);  // Agrega un log para verificar los datos
      },
      (error) => {
        console.error('Error al cargar las direcciones:', error);
      }
    );
  }
  

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
    this.paymentService.addAddress('user_id', newAddress).subscribe(
      (data) => {
        this.addresses.push(data); // Agregar la nueva dirección al array
      },
      (error) => {
        console.error('Error al agregar la dirección:', error);
      }
    );
  }

  removeAddress(address: any) {
    this.paymentService.removeAddress('user_id', address.id_direccion).subscribe(
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
