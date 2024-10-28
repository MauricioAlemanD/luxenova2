import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [],
  templateUrl: './item-shop.component.html',
  styleUrl: './item-shop.component.scss'
})
export class ItemShopComponent {
  @Input() imageUrl: string = 'assets/img/products/producto-6.jpg';
  @Input() productName: string = '';
  @Input() productPrice: number = 0;
  @Input() productDescription: string = '';
  @Input() stockQuantity: number = 0;
}
