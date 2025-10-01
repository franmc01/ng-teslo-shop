import { Product } from '@/products/interfaces/product-response.interface';
import { Component, computed, input } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.baseURL;

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  product = input.required<Product>();
  productImage = computed(() => `${API_URL}/files/product/${this.product().images[0]}`);
}
