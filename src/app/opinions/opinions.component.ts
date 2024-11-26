import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserOpinionComponent } from '../user-opinion/user-opinion.component';

interface Review {
  productName: string;
  username: string;
  rating: number;
  imageUrl: string;
  review: string;
  date: string;
}

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [UserOpinionComponent, CommonModule, HttpClientModule],  // Aquí importas HttpClientModule
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.scss']
})
export class OpinionsComponent implements OnInit {
  reviews: Review[] = [];

  // URL de la API que devuelve las opiniones
  private apiUrl = 'http://localhost:5000/opiniones'; // Asegúrate de que esta URL apunte a tu API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Realizar la solicitud HTTP para obtener las opiniones
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        // Mapear los datos de la API a la estructura que espera el componente
        this.reviews = response.map(opinion => ({
          productName: opinion.producto.nombre,
          username: opinion.usuario.first_name + ' ' + opinion.usuario.last_name,
          rating: opinion.calificacion || 0, // Si no tiene calificación, asignar 0
          imageUrl: opinion.producto.imagen || 'assets/img/default-product.jpg', // Imagen por defecto
          review: opinion.opinion,
          date: new Date(opinion.fecha).toLocaleDateString('es-ES')
        }));
      },
      (error) => {
        console.error('Error al cargar las opiniones:', error);
        // Si ocurre un error, puedes mostrar un mensaje o manejarlo de alguna otra manera
      }
    );
  }

  writeReview() {
    // Lógica para escribir una nueva reseña
    alert('Funcionalidad para escribir una reseña aún no implementada.');
  }
}
