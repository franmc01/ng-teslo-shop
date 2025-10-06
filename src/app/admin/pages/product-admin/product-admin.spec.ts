import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdmin } from './product-admin';

describe('ProductAdmin', () => {
  let component: ProductAdmin;
  let fixture: ComponentFixture<ProductAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
