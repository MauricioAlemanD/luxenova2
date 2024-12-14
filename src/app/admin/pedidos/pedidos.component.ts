import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {
  // Barra de búsqueda (ID del pedido)
  searchId: string = '';

  // Listas de pedidos completados y pendientes
  completedOrders: any[] = [];
  pendingOrders: any[] = [];

  // URL de tu API
  private apiUrl = 'http://localhost:5000/ordenesAdmin'; // Cambia esto a la URL de tu backend

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Cargar los datos de los pedidos desde la API al inicializar el componente
    this.loadOrders();
  }

  // Función para cargar los pedidos desde la API
  loadOrders() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.completedOrders = data.filter(order => order.orden.estado === 'Completado');
      this.pendingOrders = data.filter(order => order.orden.estado === 'Pendiente');
    });
  }

  // Función para filtrar pedidos por ID (búsqueda)
  searchOrder() {
    if (this.searchId) {
      this.completedOrders = this.completedOrders.filter(order => order.orden.id_orden.includes(this.searchId));
      this.pendingOrders = this.pendingOrders.filter(order => order.orden.id_orden.includes(this.searchId));
    } else {
      // Si no hay búsqueda, mostrar todos los pedidos
      this.resetOrders();
    }
  }

  // Función para restablecer la lista de pedidos
  resetOrders() {
    this.loadOrders();
  }

  // Función para marcar un pedido como enviado
  markAsShipped(orderId: string) {
    // Cambiar el estado del pedido de pendiente a completado
    const index = this.pendingOrders.findIndex(order => order.orden.id_orden === orderId);
    if (index !== -1) {
      const order = this.pendingOrders.splice(index, 1)[0];
      order.orden.estado = 'completado'; // Actualizar el estado del pedido
      this.completedOrders.push(order);
    }
  }
}
