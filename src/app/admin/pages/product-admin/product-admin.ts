import { ProductsService } from '@/products/services/products.service';
import { Component, effect, inject } from '@angular/core';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductDetailForm } from "@/shared/components/product-detail-form/product-detail-form";

@Component({
  selector: 'app-product-admin',
  imports: [ProductDetailForm],
  templateUrl: './product-admin.html',
  styleUrl: './product-admin.scss'
})
export class ProductAdmin {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsService);

  productId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['id']))
  );

  productResource = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ({ params }) => {
      return this.productService.getProductById(params.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products']);
    }
  });
}