import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showSearchInput:boolean = false;
  HideSearchInput:boolean = true;

  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
    this.HideSearchInput = false;
  }

}
