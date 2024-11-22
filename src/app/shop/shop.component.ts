import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importa HttpClient y HttpClientModule
import { ItemShopComponent } from './item-shop/item-shop.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  imageUrl: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  stockQuantity: number;
  category: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ItemShopComponent, CommonModule, FormsModule, HttpClientModule], // Asegúrate de incluir HttpClientModule aquí
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = ['Vapeador'];
  minPrice: number = 0;
  maxPrice: number = 100;
  inStock: boolean = false;
  selectedCategory: string = '';

  constructor(private http: HttpClient) {
    this.getProducts();  // Llamar a la API para obtener los productos
  }

  // Función para obtener los productos desde la API
  getProducts(): void {
    this.http.get<any>('http://localhost:5000/productos')
      .subscribe((data: any) => {
        console.log('Datos recibidos:', data);  // Verifica los datos recibidos
  
        this.products = data.map((producto: any) => ({
          imageUrl: `assets/img/products/${producto.imagen || 'producto-1.jpg'}`,  // Ruta de la imagen
          productName: producto.nombre,  // Nombre del producto
          productPrice: parseFloat(producto.precio),  // Precio del producto
          productDescription: producto.descripcion || 'Sin descripción',  // Descripción
          stockQuantity: producto.cantidad,  // Cantidad en stock
          category: producto.categoria || 'Sin categoría'  // Categoría
        }));
  
        // Aquí asignamos filteredProducts para asegurarnos de que los productos se muestren
        this.filteredProducts = [...this.products];  // Usamos spread para crear una copia
  
        // Aplica filtros si es necesario
        this.applyFilters();  // Aplica los filtros si se necesitan
      });
  }
  
  
  
  // Función para aplicar los filtros
  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesPrice = product.productPrice >= this.minPrice && product.productPrice <= this.maxPrice;
      const matchesStock = !this.inStock || product.stockQuantity > 0;
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      return matchesPrice && matchesStock && matchesCategory;
    });
  }
}
