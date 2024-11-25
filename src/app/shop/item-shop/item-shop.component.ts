import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [],
  templateUrl: './item-shop.component.html',
  styleUrls: ['./item-shop.component.scss']
})
export class ItemShopComponent {
  @Input() id_producto: number = 0; 
  @Input() imageUrl: string = '';  // Imagen del producto
  @Input() productName: string = '';  // Nombre del producto
  @Input() productPrice: number = 0;  // Precio del producto
  @Input() productDescription: string = '';  // Descripción del producto
  @Input() stockQuantity: number = 0;  // Cantidad en stock del producto
  @Output() addToCart = new EventEmitter<number>();  // Emite el ID del producto al hacer clic

  // Método para manejar el clic en "Agregar al carrito"
  onAddToCart() {
   this.addToCart.emit(this.id_producto);  // Emitir el evento con el ID del producto
  }
}
