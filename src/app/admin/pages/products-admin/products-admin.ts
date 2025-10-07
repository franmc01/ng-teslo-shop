import { ProductsService } from '@/products/services/products.service';
import { Pagination } from '@/shared/components/pagination/pagination';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ProductTable } from '@/shared/components/product-table/product-table';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-admin',
  imports: [Pagination, ProductTable],
  templateUrl: './products-admin.html',
  styleUrl: './products-admin.scss',
})
export class ProductsAdmin {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(5);

  productsResource = rxResource({
    params: () => ({ 
      offset: this.paginationService.offset(),
      limit: this.productsPerPage(),
    }),
    stream: ({ params }) =>
      this.productsService.getProducts({
        offset: params.offset,
        limit: params.limit,
      }),
  });
}
