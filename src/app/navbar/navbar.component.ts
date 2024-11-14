import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showSearchInput: boolean = false; 

  constructor(private authService: AuthService, private router: Router) {}

  toggleSearchInput(): void {
    this.showSearchInput = !this.showSearchInput;
  }

  HideSearchInput(): void {
    this.showSearchInput = !this.showSearchInput;
  }

  logout(): void {
    this.authService.logout();  // Elimina la sesión del sessionStorage
    this.router.navigate(['/ingreso']);  // Redirige al login
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();  // Verifica si el usuario está logueado
  }

  getUserEmail(): string {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user).first_name : '';
  }
}
