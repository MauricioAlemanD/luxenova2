import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-opinion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-opinion.component.html',
  styleUrl: './user-opinion.component.scss' // Corrige aquí
})
export class UserOpinionComponent {
  @Input() productName: string = '';
  @Input() username: string = '';
  @Input() rating: number = 0; // Calificación entre 1 y 5
  @Input() imageUrl: string = '';
  @Input() review: string = '';
  @Input() date: string = '';

}


