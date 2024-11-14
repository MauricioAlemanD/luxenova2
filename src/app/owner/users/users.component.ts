import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
    // Lista de usuarios con sus roles
    users = [
      { username: 'usuario1', email: 'usuario1@example.com', role: 'Admin' },
      { username: 'usuario2', email: 'usuario2@example.com', role: 'User' },
      { username: 'usuario3', email: 'usuario3@example.com', role: 'User' },
    ];
  
    // Opciones de roles disponibles
    roles = ['Admin', 'User', 'Editor'];
  
    // Función para guardar el rol modificado
    saveRole(user: any) {
      console.log('Rol guardado para el usuario:', user.username, 'Nuevo rol:', user.role);
      // Aquí puedes agregar la lógica para guardar el rol en el backend, por ejemplo.
    }
}
