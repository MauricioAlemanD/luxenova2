import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {

  @Input() product = {
    name: 'Nombre del Producto',
    description: 'Descripción del producto',
    supplier: 'Proveedor del producto',
    stock: 10,
    price: 100.00,
    images: [
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image3.jpg'
    ]
  };

}
