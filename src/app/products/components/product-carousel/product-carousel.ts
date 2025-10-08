import { AfterViewInit, Component, ElementRef, input, viewChild, effect, OnDestroy } from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ProductImagePipe } from '@/products/pipes/product-image-pipe';

@Component({
  selector: 'app-product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  styleUrl: './product-carousel.scss',
})
export class ProductCarousel implements AfterViewInit, OnDestroy {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  private swiperInstance?: Swiper;

  constructor() {
    // Usar effect en lugar de OnChanges para mejor reactividad
    effect(() => {
      const currentImages = this.images();
      if (this.swiperInstance && currentImages) {
        this.updateSwiper();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  private initializeSwiper(): void {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    this.swiperInstance = new Swiper(element, {
      direction: 'horizontal',
      loop: false, // Cambiar a false para evitar problemas con slides dinámicas
      modules: [Navigation, Pagination],
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true, // Mejora visual para muchas imágenes
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      // Configuración para mejor performance con contenido dinámico
      watchSlidesProgress: true,
      watchOverflow: true,
    });
  }

  private updateSwiper(): void {
    if (!this.swiperInstance) return;

    // Esperar un tick para que Angular actualice el DOM
    setTimeout(() => {
      // Actualizar Swiper para detectar nuevas slides
      this.swiperInstance?.update();
      
      // Recalcular la paginación
      this.swiperInstance?.pagination?.init();
      this.swiperInstance?.pagination?.render();
      this.swiperInstance?.pagination?.update();
      
      // Volver al primer slide
      this.swiperInstance?.slideTo(0, 0);
    }, 0);
  }

  ngOnDestroy(): void {
    this.swiperInstance?.destroy(true, true);
  }
}
