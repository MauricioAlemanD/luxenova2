import { Component } from '@angular/core';
import { UserOpinionComponent } from '../../user-opinion/user-opinion.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
interface Review {
  id: number;
  productName: string;
  username: string;
  rating: number;
  imageUrl: string;
  review: string;
  date: string;
}
@Component({
  selector: 'app-opinionsadmin',
  standalone: true,
  imports: [UserOpinionComponent, CommonModule, HttpClientModule], 
  templateUrl: './opinionsadmin.component.html',
  styleUrls: ['./opinionsadmin.component.scss']
})
export class OpinionsadminComponent {

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
          id: opinion.id_opinion,
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
  deleteReview(reviewId: number): void {
    const url = `${this.apiUrl}/${reviewId}`;
    this.http.delete(url).subscribe(
      () => {
        // Filtrar la reseña eliminada de la lista de reseñas
        this.reviews = this.reviews.filter(review => review.id !== reviewId);
        console.log('Reseña eliminada exitosamente');
      },
      (error) => {
        console.error('Error al eliminar la reseña:', error);
      }
    );
  }
  


  
  writeReview() {
    // Lógica para escribir una nueva reseña
    alert("Funcionalidad para escribir una reseña aún no implementada.");
  }
}
