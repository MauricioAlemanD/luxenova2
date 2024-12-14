import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './info-admin.component.html',
  styleUrls: ['./info-admin.component.scss']
})
export class InfoAdminComponent {
  companyName: string = '';
  description: string = '';
  mission: string = '';
  vision: string = '';
  pqeItems: string[] = [];

  constructor(private http: HttpClient) {
    this.loadTextos();
  }

  loadTextos() {
    this.http.get<any[]>('http://localhost:5000/textos')
      .subscribe(
        (data) => {
          const companyData = data.find(texto => texto.tipo === 'companyName');
          const descriptionData = data.find(texto => texto.tipo === 'description');
          const missionData = data.find(texto => texto.tipo === 'mission');
          const visionData = data.find(texto => texto.tipo === 'vision');

          if (companyData) this.companyName = companyData.texto;
          if (descriptionData) this.description = descriptionData.texto;
          if (missionData) this.mission = missionData.texto;
          if (visionData) this.vision = visionData.texto;

          this.pqeItems = data.filter(texto => texto.tipo === 'PQE').map(texto => texto.texto);
        },
        (error) => {
          console.error('Error al obtener los textos:', error);
        }
      );
  }

  updateTextos() {
    const textosToUpdate = [
      { id: 1, tipo: 'companyName', texto: this.companyName },
      { id: 2, tipo: 'description', texto: this.description },
      { id: 3, tipo: 'mission', texto: this.mission },
      { id: 4, tipo: 'vision', texto: this.vision },
      ...this.pqeItems.map((texto, index) => ({ id: 5 + index, tipo: 'PQE', texto }))
    ];

    textosToUpdate.forEach(texto => {
      this.http.put(`http://localhost:5000/textos/${texto.id}`, texto)
        .subscribe(
          response => {
            console.log(`Texto con id ${texto.id} actualizado`, response);
          },
          error => {
            console.error(`Error al actualizar el texto con id ${texto.id}:`, error);
          }
        );
    });
  }

  onSaveChanges() {
    this.updateTextos();
    console.log('Cambios guardados:', this.companyName, this.description, this.mission, this.vision, this.pqeItems);
  }
}
