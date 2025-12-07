import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ProductService } from '../../services/productService';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">My Products</h1>
        <a routerLink="/add-product" class="btn-primary">
          + Add New Product
        </a>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="text-center py-12">
        <p class="text-gray-600">Loading your products...</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && products.length === 0" class="text-center py-12 bg-white rounded-lg shadow">
        <p class="text-gray-600 mb-4">You haven't listed any products yet.</p>
        <a routerLink="/add-product" class="btn-primary">
          Create Your First Product
        </a>
      </div>

      <!-- Products Table -->
      <div *ngIf="!loading && products.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let product of products">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-12 w-12 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                    <img *ngIf="product.imageBase64" [src]="product.imageBase64" [alt]="product.title" class="h-12 w-12 object-cover">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.title }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-semibold">{{ product.price | currency:'USD' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ product.condition }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.createdAt | date:'short' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a [routerLink]="['/products', product.id]" class="text-blue-600 hover:text-blue-900 mr-4">View</a>
                <button (click)="deleteProduct(product.id!)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class MyProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMyProducts();
  }

  loadMyProducts(): void {
    this.auth.getAccessTokenSilently().subscribe({
      next: (token) => {
        this.productService.getMyProducts(token).subscribe({
          next: (data) => {
            this.products = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading products:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Authentication error:', err);
        this.loading = false;
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.auth.getAccessTokenSilently().subscribe({
        next: (token) => {
          this.productService.deleteProduct(id, token).subscribe({
            next: () => {
              this.products = this.products.filter(p => p.id !== id);
              alert('Product deleted successfully!');
            },
            error: (err) => {
              console.error('Error deleting product:', err);
              alert('Failed to delete product.');
            }
          });
        }
      });
    }
  }
}
