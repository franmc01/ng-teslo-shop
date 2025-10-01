import { ProductCard } from '@/shop/components/product-card/product-card';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
