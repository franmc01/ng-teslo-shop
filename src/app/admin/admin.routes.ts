import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./pages/products-admin/products-admin').then((m) => m.ProductsAdmin),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./pages/product-admin/product-admin').then((m) => m.ProductAdmin),
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

export default adminRoutes;
