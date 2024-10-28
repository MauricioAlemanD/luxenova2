import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  companyName: string = 'Luxe Nova';
  description: string = 'Bienvenido a Luxe Nova, tu destino para productos de alta calidad. Nos esforzamos por ofrecerte lo mejor en tecnología y entretenimiento.';
  mission: string = 'Nuestra misión es brindarte los mejores productos con un servicio excepcional.';
  vision: string = 'Ser líderes en la industria, ofreciendo siempre la última tecnología a nuestros clientes.';
}
