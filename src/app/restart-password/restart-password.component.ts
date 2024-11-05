import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class RestartPasswordComponent {
  nuevaPassword: string = '';
  token: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    // Obtiene el token de la URL
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  restartPassword() {
    if (this.token) {
      // Lógica para restablecer la contraseña
    } else {
      alert('No se ha proporcionado un token válido.');
      this.router.navigate(['/ingreso']); // Redirigir al inicio de sesión
    }


    if (this.token) {
      this.http.post('https://tu-api.com/restablecer-contrasena', {
        token: this.token,
        nuevaPassword: this.nuevaPassword
      }).subscribe(response => {
        alert('Contraseña restablecida correctamente');
        this.router.navigate(['/ingreso']);
      }, error => {
        console.error('Error al restablecer la contraseña:', error);
        alert('Hubo un error al restablecer la contraseña. Por favor, verifica el token y la nueva contraseña.');
      });
    } else {
      alert('No se ha proporcionado un token válido.');
    }
  }
}
