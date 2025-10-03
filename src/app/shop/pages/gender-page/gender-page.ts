import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/products.service';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Pagination } from "@/shared/components/pagination/pagination";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
  styleUrl: './gender-page.scss',
})
export class GenderPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  protected readonly paginationService = inject(PaginationService);

  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    params: () => ({ gender: this.gender(), offset: this.paginationService.offset() }),
    stream: ({ params }) =>
      this.productsService.getProducts({
        gender: params.gender,
        offset: params.offset,
        limit: this.paginationService.limit(),
      }),
  });
}
