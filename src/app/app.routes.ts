import { Routes } from '@angular/router';
import authRoutes from './auth/auth.routes';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
    canMatch: [notAuthenticatedGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./shop/store-front.routes').then(m => m.storeFrontRoutes)
  },
];
