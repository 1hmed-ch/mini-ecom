import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="text-2xl font-bold text-blue-600">
              🛒 MiniStore
            </a>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center space-x-4">
            <a routerLink="/" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>

            <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
              <a routerLink="/add-product" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Add Product
              </a>
              <a routerLink="/my-products" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                My Products
              </a>
              <button (click)="logout()" class="btn-secondary">
                Logout
              </button>
            </ng-container>

            <ng-template #loggedOut>
              <button (click)="login()" class="btn-primary">
                Login
              </button>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }
}
