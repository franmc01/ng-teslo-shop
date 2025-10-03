import { ProductsService } from '@/products/services/products.service';
import { ProductCard } from '@/products/components/product-card/product-card';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from '@/shared/components/pagination/pagination';
import { PaginationService } from '@/shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly productsService = inject(ProductsService);
  protected readonly paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({ offset: this.paginationService.offset() }),
    stream: ({ params }) =>
      this.productsService.getProducts({
        offset: params.offset,
        limit: this.paginationService.limit(),
      }),
  });
}
