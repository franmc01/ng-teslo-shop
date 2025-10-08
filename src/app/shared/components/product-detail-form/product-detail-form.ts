import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { Product } from '@/products/interfaces/product-response.interface';
import { ProductsService } from '@/products/services/products.service';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormErrorLabel } from '../form-error-label/form-error-label';
import { FormUtils } from '@utils/form-utils';

@Component({
  selector: 'app-product-detail-form',
  imports: [ReactiveFormsModule, ProductCarousel, FormErrorLabel],
  templateUrl: './product-detail-form.html',
  styleUrl: './product-detail-form.scss',
})
export class ProductDetailForm {
  product = input.required<Product>();

  router = inject(Router);
  fb = inject(FormBuilder);

  productsService = inject(ProductsService);
  wasSaved = signal(false);

  imageFileList = signal<FileList | null>(null);
  tempImages = signal<string[]>([]);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  imagesToCarousel = computed(() => [...this.tempImages(), ...this.product().images]);

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
    // this.productForm.patchValue(formLike as any);
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? [],
    };

    if (this.product().id === 'new') {
      // Crear producto
      const product = await firstValueFrom(this.productsService.createProduct(productLike));

      this.router.navigate(['/admin/products', product.id]);
    } else {
      await firstValueFrom(
        this.productsService.updateProduct(
          this.product().id,
          productLike,
          this.imageFileList() ?? new DataTransfer().files
        )
      );
    }

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

  onFilesChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files) {
      const images = Array.from(files).map((file) => URL.createObjectURL(file));
      this.tempImages.set(images);
      this.imageFileList.set(files);
    }
  }
}
