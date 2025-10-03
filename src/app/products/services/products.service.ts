import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '../interfaces/product-response.interface';
import { Observable, of, tap } from 'rxjs';
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

  private productsCache = new Map<string, ProductResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options?: RequestOptions) {
    const { limit = 8, offset = 0, gender = '' } = options || {};
    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key));
    }

    return this.http
      .get<ProductResponse>(`${API_URL}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((response) => {
          this.productsCache.set(key, response);
        })
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http
      .get<Product>(`${API_URL}/products/${idSlug}`)
      .pipe(tap((product) => this.productCache.set(idSlug, product)));
  }
}
