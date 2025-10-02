import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '../interfaces/product-response.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.baseURL;

interface RequestOptions {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  getProducts(options?: RequestOptions) {
    return this.http
      .get<ProductResponse>(`${API_URL}/products`, {
        params: {
          limit: options?.limit ?? 100,
          offset: options?.offset ?? 0,
          gender: options?.gender ?? ""
        }
      })
      .pipe(
        tap((response) => {
          console.log('Products fetched:', response);
        })
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${idSlug}`);
  }
}