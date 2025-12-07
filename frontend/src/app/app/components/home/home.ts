import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/productService';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">Available Products</h1>

      <!-- Loading State -->
      <div *ngIf="loading" class="text-center py-12">
        <p class="text-gray-600">Loading products...</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && products.length === 0" class="text-center py-12">
        <p class="text-gray-600">No products available yet.</p>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div *ngFor="let product of products" class="card cursor-pointer" [routerLink]="['/products', product.id]">
          <!-- Product Image -->
          <div class="h-48 bg-gray-200 overflow-hidden">
            <img
              *ngIf="product.imageBase64"
              [src]="product.imageBase64"
              [alt]="product.title"
              class="w-full h-full object-cover"
            />
            <div *ngIf="!product.imageBase64" class="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 truncate">{{ product.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ product.condition }}</p>
            <p class="text-xl font-bold text-blue-600 mt-2">{{ product.price | currency:'USD' }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }
}
