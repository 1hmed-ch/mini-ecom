import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/productService';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <button (click)="goBack()" class="btn-secondary mb-6">
        ← Back to Products
      </button>

      <div *ngIf="loading" class="text-center py-12">
        <p class="text-gray-600">Loading product details...</p>
      </div>

      <div *ngIf="!loading && product" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Product Image -->
          <div class="bg-gray-200 h-96">
            <img
              *ngIf="product.imageBase64"
              [src]="product.imageBase64"
              [alt]="product.title"
              class="w-full h-full object-cover"
            />
            <div *ngIf="!product.imageBase64" class="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          </div>

          <!-- Product Details -->
          <div class="p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.title }}</h1>

            <div class="mb-4">
              <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {{ product.condition }}
              </span>
            </div>

            <p class="text-4xl font-bold text-blue-600 mb-6">
              {{ product.price | currency:'USD' }}
            </p>

            <div class="border-t border-gray-200 pt-4">
              <h2 class="text-lg font-semibold text-gray-800 mb-2">Description</h2>
              <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
            </div>

            <div class="mt-6 text-sm text-gray-500">
              Posted on: {{ product.createdAt | date:'medium' }}
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="!loading && !product" class="text-center py-12">
        <p class="text-red-600">Product not found.</p>
      </div>
    </div>
  `,
  styles: []
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
