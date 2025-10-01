import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shop/store-front.routes').then(m => m.storeFrontRoutes)
  }
];
