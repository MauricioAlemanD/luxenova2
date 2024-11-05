import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,CommonModule],
/*   templateUrl: './app.component.html', */
  template:`
    <ng-container *ngIf="!isLoginOrRegisterPage()">
      <app-navbar></app-navbar>
    </ng-container>
    <router-outlet></router-outlet>
    <ng-container *ngIf="!isLoginOrRegisterPage()">
      <app-footer></app-footer>
    </ng-container>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'luxenova';
  constructor(private router: Router) {}

  isLoginOrRegisterPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/ingreso' || currentRoute === '/registro' || currentRoute === '/recuperar';
  }
}
