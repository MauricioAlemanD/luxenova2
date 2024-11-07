import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';  // Verifica si estamos en un navegador
  }

  login(token: string): void {
    if (this.isBrowser) {
      sessionStorage.setItem('token', token);  // Guarda el token en el sessionStorage
    }
  }

  logout(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem('token');  // Elimina el token del sessionStorage
      sessionStorage.removeItem('user');  // Elimina los datos del usuario
      sessionStorage.removeItem('role');  // Elimina el rol del usuario
    }
  }

  isLoggedIn(): boolean {
    return this.isBrowser && sessionStorage.getItem('token') !== null;  // Verifica si el token existe
  }

  getToken(): string | null {
    return this.isBrowser ? sessionStorage.getItem('token') : null;  // Obtiene el token del sessionStorage
  }
}
