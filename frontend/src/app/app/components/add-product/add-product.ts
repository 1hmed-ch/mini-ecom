import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ProductService } from '../../services/productService';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">Add New Product</h1>

      <form (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-lg p-6">
        <!-- Title -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Title *</label>
          <input
            type="text"
            [(ngModel)]="product.title"
            name="title"
            class="input-field"
            placeholder="e.g., iPhone 13 Pro Max"
            required
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Description *</label>
          <textarea
            [(ngModel)]="product.description"
            name="description"
            rows="4"
            class="input-field"
            placeholder="Detailed description of your product..."
            required
          ></textarea>
        </div>

        <!-- Price -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Price (USD) *</label>
          <input
            type="number"
            [(ngModel)]="product.price"
            name="price"
            class="input-field"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <!-- Condition -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Condition *</label>
          <select
            [(ngModel)]="product.condition"
            name="condition"
            class="input-field"
            required
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Used - Like New">Used - Like New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">Used - Fair</option>
          </select>
        </div>

        <!-- Image Upload -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
          <input
            type="file"
            (change)="onFileSelected($event)"
            accept="image/*"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div *ngIf="imagePreview" class="mt-4">
            <img [src]="imagePreview" alt="Preview" class="h-48 rounded-lg">
          </div>
        </div>

        <!-- Error Message -->
        <div *ngIf="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div *ngIf="successMessage" class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {{ successMessage }}
        </div>

        <!-- Submit Button -->
        <div class="flex space-x-4">
          <button
            type="submit"
            [disabled]="loading"
            class="btn-primary flex-1"
          >
            {{ loading ? 'Creating...' : 'Create Product' }}
          </button>
          <button
            type="button"
            (click)="cancel()"
            class="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class AddProductComponent {
  product: Product = {
    title: '',
    description: '',
    price: 0,
    condition: ''
  };

  imagePreview: string | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private router: Router
  ) {}

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await this.productService.convertToBase64(file);
        this.product.imageBase64 = base64;
        this.imagePreview = base64;
      } catch (error) {
        this.errorMessage = 'Failed to process image';
      }
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.getAccessTokenSilently().subscribe({
      next: (token) => {
        this.productService.createProduct(this.product, token).subscribe({
          next: () => {
            this.successMessage = 'Product created successfully!';
            setTimeout(() => this.router.navigate(['/my-products']), 1500);
          },
          error: (err) => {
            this.errorMessage = 'Failed to create product. Please try again.';
            this.loading = false;
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Authentication failed. Please login again.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
