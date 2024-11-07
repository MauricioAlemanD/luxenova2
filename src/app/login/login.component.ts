import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.http.post('http://127.0.0.1:5000/login', loginData)
      .subscribe(
        (response: any) => {
          sessionStorage.setItem('user', JSON.stringify(response.user));
          sessionStorage.setItem('role', response.role);
          this.authService.login(response.token);  // Guarda el token usando AuthService
          this.router.navigate(['/']);  // Redirige al usuario
        },
        (error) => {
          this.errorMessage = 'Credenciales incorrectas, intenta nuevamente.';
        }
      );
  }
}
