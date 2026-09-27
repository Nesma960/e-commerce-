import { ProductsData } from './../../core/models/products-data.interface';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductDetailsData } from '../../core/models/product-details-data.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-details',
  styleUrl: './details.component.css',
  templateUrl: './details.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)


  productId: WritableSignal<string> = signal<string>('')
  productData: WritableSignal<ProductDetailsData> = signal<ProductDetailsData>({} as ProductDetailsData)
  selectedImage = signal<string>('');
  quantity: WritableSignal<number> = signal<number>(1)

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId.set(params.get('id')!) //product id

      // call api

      this.getSpecificProductData();

    })
  }

  getSpecificProductData(): void {
    this.productsService.getSpecificProduct(this.productId()).subscribe({
      next: (res) => {
        this.productData.set(res.data)
        this.selectedImage.set(res.data.imageCover)
      }
    })
  }

  incrementQuantity(): void {
    this.quantity.update(value => Math.min(value + 1, this.productData().quantity))
  }
  decrementQuantity(): void {
    this.quantity.update(value => Math.max(1, value - 1))
  }

}
