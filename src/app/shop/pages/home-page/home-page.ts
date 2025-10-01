import { ProductsService } from '@/products/services/products.service';
import { ProductCard } from '@/shop/components/product-card/product-card';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  private readonly productsService = inject(ProductsService);

  productsResource = rxResource({
    stream: () => this.productsService.getProducts()
  });

}