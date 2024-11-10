import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './info-admin.component.html',
  styleUrl: './info-admin.component.scss'
})
export class InfoAdminComponent {
  companyName: string = 'Luxenova';
  description: string = 'Bienvenido a Luxe Nova, tu destino para productos de alta calidad. Nos esforzamos por ofrecerte lo mejor en tecnología y entretenimiento.';
  mission: string = 'Nuestra misión es brindarte los mejores productos con un servicio excepcional.';
  vision: string = 'Ser líderes en la industria, ofreciendo siempre la última tecnología a nuestros clientes.';

  reasonsToChoose = [
    'Productos de alta calidad',
    'Precios competitivos',
    'Excelente atención al cliente',
    'Envíos rápidos y seguros'
  ];

  onSaveChanges() {
    console.log('Cambios guardados:', this.companyName, this.description, this.mission, this.vision, this.reasonsToChoose);
  }
}
