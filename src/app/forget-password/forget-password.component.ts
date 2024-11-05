import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  enviarCorreo() {
    // Simula el envío del correo (reemplaza esto con tu lógica de envío real)
    console.log('Correo enviado a:', this.email);

    // Mostrar el modal de confirmación
    const modalElement = document.getElementById('popupConfirmacion');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }

    // Opcionalmente, redirigir después de un tiempo
    setTimeout(() => {
      this.router.navigate(['/restablecer-contrasena']); // Cambia a la ruta real de restablecer contraseña
    }, 3000);
  }
}
