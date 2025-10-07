import { isAdminGuard } from '@/auth/guards/is-admin-guard';
import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then((m) => m.AdminLayout),
    canMatch: [isAdminGuard],
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products-admin/products-admin').then((m) => m.ProductsAdmin),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./pages/product-admin/product-admin').then((m) => m.ProductAdmin),
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default adminRoutes;
