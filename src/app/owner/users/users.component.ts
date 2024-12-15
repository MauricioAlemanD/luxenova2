import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // Lista de usuarios con sus roles
  users: any[] = []; // Definir los usuarios como un array vacío inicialmente

  // Lista de roles obtenidos desde la base de datos (cargados solo una vez)
  roles: string[] = [];

  // URL del backend para obtener los usuarios
  private apiUrl = 'http://localhost:5000/get_users'; // Cambia esta URL según sea necesario
  private rolesUrl = 'http://localhost:5000/get_roles'; // URL para obtener los roles desde el backend
  private updateRoleUrl = 'http://localhost:5000/update_role'; // URL para actualizar el rol del usuario

  constructor(private http: HttpClient) { }

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles(); // Cargar roles solo una vez al inicio
  }

  // Método para cargar los usuarios desde el backend
  loadUsers(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.users = data; // Asignamos los usuarios obtenidos del backend
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  // Método para cargar los roles desde el backend solo una vez
  loadRoles(): void {
    if (this.roles.length === 0) { // Verificar que los roles no se hayan cargado ya
      this.http.get<string[]>(this.rolesUrl).subscribe(
        (data) => {
          this.roles = data; // Asignamos los roles obtenidos del backend
        },
        (error) => {
          console.error('Error al cargar los roles:', error);
        }
      );
    }
  }

  // Función para guardar el rol modificado
  saveRole(user: any): void {
    console.log('Rol guardado para el usuario:', user.first_name, 'Nuevo rol:', user.role);
    this.http.post(this.updateRoleUrl, { user_id: user.id, new_role: user.role }).subscribe(
      (response: any) => {
        console.log(response.message);
        location.reload();
      },
      (error) => {
        console.error('Error al actualizar el rol del usuario:', error);
      }
    );
  }
}
