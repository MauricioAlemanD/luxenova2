import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de incluir HttpClientModule
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],  // Asegúrate de incluir HttpClientModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  section1Data: any[] = [];
  section2Data: any[] = [];
  categorias: string[] = [];  // Nueva variable para las categorías

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getSection1Data();  
    this.getSection2Data();  
    this.getCategorias();  // Llamamos a la función que obtiene las categorías
    this.loadScripts(); 
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getSection1Data() {
    const url = 'http://localhost:5000/home-section?section=section-1';

    this.http.get(url).subscribe(
      (data: any) => {
        if (data && data['section-1']) {
          this.section1Data = data['section-1'];
        } else {
          console.error('No data found for section 1');
        }
      },
      error => {
        console.error('Error al obtener los datos de section-1:', error);
      }
    );
  }

  getSection2Data() {
    const url = 'http://localhost:5000/home-section?section=section-2';

    this.http.get(url).subscribe(
      (data: any) => {
        if (data && data['section-2']) {
          this.section2Data = data['section-2'];
        } else {
          console.error('No data found for section 2');
        }
      },
      error => {
        console.error('Error al obtener los datos de section-2:', error);
      }
    );
  }

  getCategorias() {
    // Petición a Flask para obtener las categorías
    const url = 'http://localhost:5000/categorias';  // Asegúrate de que la URL sea correcta
    this.http.get<string[]>(url).subscribe(
      (data) => {
        this.categorias = data;  // Asignamos las categorías obtenidas a la variable
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  loadScripts() {
    // Cargar dinámicamente los scripts
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2024/12/04/18/20241204181616-B94N9OXS.js';
    script2.async = true;
    document.body.appendChild(script2);
  }

}



