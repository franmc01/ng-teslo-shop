import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ProductResponse } from '../interfaces/product-response.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@/auth/interfaces/user.interface';

const API_URL = environment.baseURL;

interface RequestOptions {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User,
};

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
  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http
      .get<Product>(`${API_URL}/products/${id}`)
      .pipe(tap((product) => this.productCache.set(id, product)));
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>
  ): Observable<Product> {
    return this.http
      .patch<Product>(`${API_URL}/products/${id}`, productLike)
      .pipe(tap((product) => this.updateProductCache(product)));
  }

  createProduct(productLike: Partial<Product>): Observable<Product> {
    return this.http
      .post<Product>(`${API_URL}/products`, productLike)
      .pipe(tap((product) => this.updateProductCache(product)));
  }

  updateProductCache(product: Product) {
    const productId = product.id;

    this.productCache.set(productId, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map(
        (currentProduct) =>
          currentProduct.id === productId ? product : currentProduct
      );
    });

    console.log('Caché actualizado');
  }
}