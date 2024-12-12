import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Asegúrate de incluir HttpClientModule aquí
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  companyName: string = '';
  description: string = '';
  mission: string = '';
  vision: string = '';
  pqeItems: string[] = []; // Nueva propiedad para los datos PQE

  constructor(private http: HttpClient) {
    this.loadTextos();
  }

  loadTextos() {
    this.http.get<any[]>('http://localhost:5000/textos')  // Aquí la URL de tu API
      .subscribe(
        (data) => {
          // Asumiendo que los textos en la respuesta tienen tipo: 'companyName', 'description', 'mission', 'vision'
          const companyData = data.find(texto => texto.tipo === 'companyName');
          const descriptionData = data.find(texto => texto.tipo === 'description');
          const missionData = data.find(texto => texto.tipo === 'mission');
          const visionData = data.find(texto => texto.tipo === 'vision');
          
          // Asignamos los datos a las variables correspondientes
          if (companyData) this.companyName = companyData.texto;
          if (descriptionData) this.description = descriptionData.texto;
          if (missionData) this.mission = missionData.texto;
          if (visionData) this.vision = visionData.texto;

          // Cargar los datos de tipo PQE (Por qué elegirnos)
          this.pqeItems = data.filter(texto => texto.tipo === 'PQE').map(texto => texto.texto);
        },
        (error) => {
          console.error('Error al obtener los textos:', error);
        }
      );
  }
}
