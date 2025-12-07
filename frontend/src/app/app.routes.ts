import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home';
import { ProductDetailsComponent } from './app/components/product-details/product-details';
import { AddProductComponent } from './app/components/add-product/add-product';
import { MyProductsComponent } from './app/components/my-products/my-products';
import { authGuard } from './app/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'add-product', component: AddProductComponent, canActivate: [authGuard] },
  { path: 'my-products', component: MyProductsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
