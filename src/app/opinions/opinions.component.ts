import { Component } from '@angular/core';
import { UserOpinionComponent } from '../user-opinion/user-opinion.component';
import { CommonModule } from '@angular/common';

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
  imports: [UserOpinionComponent,CommonModule],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.scss'
})
export class OpinionsComponent {
  reviews = [
    {
      productName: 'Producto 1',
      username: 'Usuario 1',
      rating: 5,
      imageUrl: 'assets/img/products/producto-7.jpg',
      review: '¡Excelente producto! Muy recomendable.',
      date: '2024-10-27',
    },
    {
      productName: 'Producto 2',
      username: 'Usuario 2',
      rating: 4,
      imageUrl: 'assets/img/products/producto-7.jpg',
      review: 'Buena calidad, pero podría ser más barato.',
      date: '2024-10-26',
    },
    // Agrega más reseñas aquí...
  ];

  writeReview() {
    // Lógica para escribir una nueva reseña
    alert("Funcionalidad para escribir una reseña aún no implementada.");
  }
}
