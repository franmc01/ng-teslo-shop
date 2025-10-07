import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailForm } from './product-detail-form';

describe('ProductDetailForm', () => {
  let component: ProductDetailForm;
  let fixture: ComponentFixture<ProductDetailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
