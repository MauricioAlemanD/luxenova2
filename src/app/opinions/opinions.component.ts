import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserOpinionComponent } from '../user-opinion/user-opinion.component';
import { FormsModule } from '@angular/forms';

interface Review {
  productName: string;
  username: string;
  rating: number;
  imageUrl: string;
  review: string;
  date: string;
}

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [UserOpinionComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.scss']
})
export class OpinionsComponent implements OnInit {
  reviews: Review[] = [];
  purchasedProducts: Product[] = [];
  selectedProduct: number | null = null; // or you can initialize it with 0 or any default value

  reviewText: string = '';
  rating: number = 0;
  showPopup: boolean = false;
  stars: boolean[] = [false, false, false, false, false];

  private apiUrl = 'http://localhost:5000/opiniones'; // URL de la API para las reseñas
  private productsApiUrl = 'http://localhost:5000/productos'; // URL de la API para los productos comprados

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener los productos comprados
    this.http.get<Product[]>(this.productsApiUrl).subscribe(
      (response) => {
        this.purchasedProducts = response;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );

    // Obtener las opiniones de los productos
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.reviews = response.map(opinion => ({
          productName: opinion.producto.nombre,
          username: opinion.usuario.first_name + ' ' + opinion.usuario.last_name,
          rating: opinion.calificacion || 0,
          imageUrl: opinion.producto.imagen || 'assets/img/default-product.jpg',
          review: opinion.opinion,
          date: new Date(opinion.fecha).toLocaleDateString('es-ES')
        }));
      },
      (error) => {
        console.error('Error al cargar las opiniones:', error);
      }
    );
  }

  openReviewPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  setRating(starIndex: number): void {
    this.rating = starIndex;
    this.stars = this.stars.map((_, index) => index < starIndex);
  }

  submitReview(): void {
    const newReview = {
      productId: this.selectedProduct,
      review: this.reviewText,
      rating: this.rating,
      date: new Date().toISOString(),
    };

    // Enviar la opinión a la API
    this.http.post(this.apiUrl, newReview).subscribe(
      (response) => {
        console.log('Opinión enviada correctamente', response);
        this.reviews.push({
          productName: this.purchasedProducts.find(p => p.id === this.selectedProduct)?.name || 'Producto',
          username: 'Usuario', // Este puede ser el nombre del usuario actual si lo tienes
          rating: this.rating,
          imageUrl: 'assets/img/default-product.jpg', // Aquí puedes agregar la imagen del producto
          review: this.reviewText,
          date: new Date().toLocaleDateString('es-ES')
        });
        this.closePopup();
      },
      (error) => {
        console.error('Error al enviar la opinión:', error);
      }
    );
  }
}
