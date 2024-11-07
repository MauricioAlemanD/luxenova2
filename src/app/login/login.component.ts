import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Para las peticiones HTTP
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Inicializamos el formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validamos el email
      password: ['', [Validators.required]] // Validamos que la contraseña no esté vacía
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return; // Si el formulario es inválido, no hace nada
    }

    const loginData = this.loginForm.value;
    this.http.post('http://127.0.0.1:5000/login', loginData)
      .subscribe(
        (response: any) => {
          // Si el login es exitoso, redirigimos al usuario
          this.router.navigate(['/']);  // Puedes cambiar esta ruta a la que desees
        },
        (error) => {
          // Si hay un error, mostramos el mensaje
          this.errorMessage = 'Credenciales incorrectas, intenta nuevamente.';
        }
      );
  }
}


