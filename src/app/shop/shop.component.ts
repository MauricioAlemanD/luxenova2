import { Component } from '@angular/core';
import { ItemShopComponent } from './item-shop/item-shop.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

interface Product {
  imageUrl: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  stockQuantity: number;
  category: string; // Nueva propiedad para categoría
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports:[ItemShopComponent,CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = ['Categoría 1', 'Categoría 2', 'Categoría 3']; // Agrega tus categorías aquí
  minPrice: number = 0;
  maxPrice: number = 100;
  inStock: boolean = false;
  selectedCategory: string = '';

  constructor() {
    // Generar productos de ejemplo
    for (let i = 0; i < 40; i++) {
      this.products.push({
        imageUrl: `assets/img/products/producto-${(i % 8) + 1}.jpg`,
        productName: `Producto ${i + 1}`,
        productPrice: parseFloat((Math.random() * 50 + 10).toFixed(2)),
        productDescription: `Descripción del producto ${i + 1}`,
        stockQuantity: Math.floor(Math.random() * 100) + 1,
        category: `Categoría ${(i % 3) + 1}` // Asignar categoría aleatoria para el ejemplo
      });
    }
    this.filteredProducts = this.products; // Inicializa la lista filtrada
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesPrice =
        product.productPrice >= this.minPrice && product.productPrice <= this.maxPrice;
      const matchesStock = !this.inStock || product.stockQuantity > 0;
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      return matchesPrice && matchesStock && matchesCategory;
    });
  }
}
