import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productIdSlug = this.activatedRoute.snapshot.params['slug'];

  productResource = rxResource({
    stream: () => this.productsService.getProductByIdSlug(this.productIdSlug),
  });
}
