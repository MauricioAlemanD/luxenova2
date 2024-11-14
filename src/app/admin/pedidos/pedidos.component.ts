import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {
   // Barra de búsqueda (ID del pedido)
   searchId: string = '';

   // Lista de pedidos completados y pendientes
   completedOrders = [
     { id: '123', customer: 'Juan Pérez', date: '2024-10-28' },
     { id: '124', customer: 'Ana García', date: '2024-10-27' },
     // Más pedidos realizados...
   ];
 
   pendingOrders = [
     { id: '125', customer: 'Carlos Ruiz', date: '2024-10-29' },
     { id: '126', customer: 'Laura Sánchez', date: '2024-10-30' },
     // Más pedidos pendientes...
   ];
 
   // Función para filtrar pedidos por ID (búsqueda)
   searchOrder() {
     if (this.searchId) {
       this.completedOrders = this.completedOrders.filter(order => order.id.includes(this.searchId));
       this.pendingOrders = this.pendingOrders.filter(order => order.id.includes(this.searchId));
     } else {
       // Si no hay búsqueda, mostrar todos los pedidos
       this.resetOrders();
     }
   }
 
   // Función para restablecer la lista de pedidos
   resetOrders() {
     // Restaurar los pedidos
     this.completedOrders = [
       { id: '123', customer: 'Juan Pérez', date: '2024-10-28' },
       { id: '124', customer: 'Ana García', date: '2024-10-27' },
       // Más pedidos realizados...
     ];
 
     this.pendingOrders = [
       { id: '125', customer: 'Carlos Ruiz', date: '2024-10-29' },
       { id: '126', customer: 'Laura Sánchez', date: '2024-10-30' },
       // Más pedidos pendientes...
     ];
   }
 
   // Función para marcar un pedido como enviado
   markAsShipped(orderId: string) {
     // Cambiar el estado del pedido de pendiente a completado
     const index = this.pendingOrders.findIndex(order => order.id === orderId);
     if (index !== -1) {
       const order = this.pendingOrders.splice(index, 1)[0];
       this.completedOrders.push(order);
     }
   }
}
