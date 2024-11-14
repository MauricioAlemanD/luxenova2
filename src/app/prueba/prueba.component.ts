import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './prueba.component.html', // Aquí se debe referir al archivo HTML
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent {
  message: string = ''; // Para almacenar el mensaje del JSON
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Realiza la solicitud HTTP a Flask
    this.http.get<{ message: string }>('http://127.0.0.1:5000').subscribe(response => {
      // Almacena el valor de la propiedad 'message' del JSON
      this.message = response.message;
    });
  }
}
