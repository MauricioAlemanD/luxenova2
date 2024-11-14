import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  
  paymentMethods = [
    { type: 'Visa', last4: '1234' },
    { type: 'MasterCard', last4: '5678' }
  ];

  addresses = ['Av. Reforma 123, Ciudad de México', 'Calle Falsa 123, Monterrey'];

  orders = [
    { orderId: '001', productName: 'Producto 1', orderDate: '2024-11-01' },
    { orderId: '002', productName: 'Producto 2', orderDate: '2024-10-25' }
  ];

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/ingreso']);  // Redirige a /ingreso si no está autenticado
    }
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
    alert('Añadir dirección');
  }

  removeAddress(address: string) {
    this.addresses = this.addresses.filter(a => a !== address);
  }

  editPaymentMethod(card: any) {
    // Lógica para editar el método de pago
  }

  getUserRole(): string {
    let role = sessionStorage.getItem('role');
    if (role === 'owner') {
      return 'Propietario';
    } else if (role === 'admin') {
      return 'Administrador';
    }
    return role ? role : '';
  }

  getUserNameData(){
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user).first_name : '';
  }
  getUserLastNameData(){
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user).last_name : '';
  }

  getUserEmailData(){
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user).email : '';
  }

  isLoggedIn(): boolean {
    let pass: boolean = false;  // Se declara la variable pass
    let role = sessionStorage.getItem('role');
    
    if (role === 'owner' || role === 'admin') {
      pass = true;  // Si el rol es 'owner' o 'admin', pass será true
    } else {
      pass = false;  // Si no es ninguno de esos, pass será false
    }
  
    return pass;  // Se retorna el valor de pass
  }

  isOwnerIn(): boolean {
    let pass: boolean = false;  // Se declara la variable pass
    let role = sessionStorage.getItem('role');
    
    if (role === 'owner') {
      pass = true;  // Si el rol es 'owner' o 'admin', pass será true
    } else {
      pass = false;  // Si no es ninguno de esos, pass será false
    }
  
    return pass;  // Se retorna el valor de pass
  }
  
}
