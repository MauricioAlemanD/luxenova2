import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [],
  templateUrl: './item-shop.component.html',
  styleUrls: ['./item-shop.component.scss']
})
export class ItemShopComponent {
  @Input() imageUrl: string = '';  // Imagen del producto
  @Input() productName: string = '';  // Nombre del producto
  @Input() productPrice: number = 0;  // Precio del producto
  @Input() productDescription: string = '';  // Descripción del producto
  @Input() stockQuantity: number = 0;  // Cantidad en stock del producto
}
