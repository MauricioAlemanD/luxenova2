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

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getSection1Data();  
    this.getSection2Data();  
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getFeaturedProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/featured`);
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
}
