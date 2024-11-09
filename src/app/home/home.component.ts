import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de incluir HttpClientModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],  // Asegúrate de incluir HttpClientModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variables para almacenar los datos del JSON
  section1Data: any[] = [];
  section2Data: any[] = [];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getSection1Data();  // Llamamos a la función que hace la solicitud HTTP para section-1
    this.getSection2Data();  // Llamamos a la función que hace la solicitud HTTP para section-2
  }

  // Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Función que hace la solicitud HTTP para obtener los datos de la sección 1
  getSection1Data() {
    const url = 'http://127.0.0.1:5000/home-section?section=section-1';
    
    // Realiza la solicitud GET
    this.http.get(url).subscribe(
      (data: any) => {
        console.log('Section 1:', data);  // Imprime la respuesta JSON en la consola

        // Asigna los valores a la variable section1Data
        if (data && Array.isArray(data)) {
          this.section1Data = data;
        }
      },
      error => {
        console.error('Error al obtener los datos de section-1:', error);  // En caso de error
      }
    );
  }

  // Función que hace la solicitud HTTP para obtener los datos de la sección 2
  getSection2Data() {
    const url = 'http://127.0.0.1:5000/home-section?section=section-2';
    
    // Realiza la solicitud GET
    this.http.get(url).subscribe(
      (data: any) => {
        console.log('Section 2:', data);  // Imprime la respuesta JSON en la consola

        // Asigna los valores a la variable section2Data
        if (data && Array.isArray(data)) {
          this.section2Data = data;
        }
      },
      error => {
        console.error('Error al obtener los datos de section-2:', error);  // En caso de error
      }
    );
  }
}
