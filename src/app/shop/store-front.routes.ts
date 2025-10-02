import { Routes } from "@angular/router";
import { StoreLayout } from "./layouts/store-layout/store-layout";

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
      },
      {
        path: 'product/:slug',
        loadComponent: () => import('./pages/product-page/product-page').then(m => m.ProductPage)
      },
      {
        path: 'gender/:gender',
        loadComponent: () => import('./pages/gender-page/gender-page').then(m => m.GenderPage)
      },
      {
        path: '**',
        loadComponent: () => import('./pages/notfound-page/notfound-page').then(m => m.NotfoundPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]

export default storeFrontRoutes;