import { Product } from '@/products/interfaces/product-response.interface';
import { ProductImagePipe } from '@/products/pipes/product-image-pipe';
import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss'
})
export class ProductTable {
  products = input.required<Product[]>();
}
