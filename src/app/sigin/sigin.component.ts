import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importa HttpClient y HttpClientModule
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar ngIf y ngFor

@Component({
  selector: 'app-sigin',
  standalone: true,  // Haciendo este componente independiente (standalone)
  templateUrl: './sigin.component.html',  // Enlazamos el archivo HTML
  styleUrls: ['./sigin.component.scss'], // Enlazamos el archivo CSS
  imports: [CommonModule, HttpClientModule],  // Añadir HttpClientModule a los imports
})
export class SiginComponent {
  // Crear una instancia de HttpClient
  private http = inject(HttpClient);

  // Método para manejar el envío del formulario
  onSubmit(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Obtener los valores de los campos del formulario
    const firstName = (document.getElementById('first_name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirm_password') as HTMLInputElement).value;

    // Validación simple
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Enviar los datos a la API (suponiendo que tienes un endpoint de signup)
    this.http.post('http://localhost:5000/signup', {
      first_name: firstName,
      email: email,
      phone: phone,
      password: password
    }).subscribe(response => {
      console.log('Usuario registrado exitosamente:', response);
      alert('Usuario registrado exitosamente');
      window.location.href = 'http://localhost:4200/ingreso';

    }, error => {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar el usuario');
    });
  }
}
