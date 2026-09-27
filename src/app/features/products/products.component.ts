import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsData } from '../../core/models/product-details-data.interface';
import { ProductsService } from '../../core/services/products/products.service';

@Component({
  imports: [],
  selector: 'app-products',
  styleUrl: './products.component.css',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  private readonly productsService = inject(ProductsService)
  private readonly activatedRoute = inject(ActivatedRoute)

  SubCategoryId: WritableSignal<string> = signal<string>('');
  SubCategoryDataList: WritableSignal<ProductDetailsData> = signal<ProductDetailsData>({} as ProductDetailsData)
  brandId: string = '';

  // brandDetails: WritableSignal<BrandsData[]> = signal<BrandsData[]>([])

  ngOnInit(): void {
    // this.getSubCategoryId();
    // this.getBrandId()
    this.getProductId()
  }

  // getSubCategoryId(): void {
  //   this.activatedRoute.queryParamMap.subscribe((params) => {

  //     const subCategoryIdd = params.get("subcategory");
  //     if (!subCategoryIdd) {
  //       return
  //     }
  //     this.SubCategoryId.set(subCategoryIdd)
  //     // call api
  //     this.getProductsBySubcategoryData();
  //   })

  // }

  // getBrandId(): void {
  //   this.activatedRoute.queryParamMap.subscribe((params) => {
  //     const brandId = params.get('brand');

  //     if (!brandId) {
  //       return;
  //     }

  //     this.brandId = brandId;

  //     this.getProductsByBrand();
  //   });

  // }

  getProductId() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const brandId = params.get('brand');
      const subCategoryId = params.get('subcategory');

      if (brandId) {
        this.brandId = brandId;
        this.getProductsByBrand();
      }

      if (subCategoryId) {
        this.SubCategoryId.set(subCategoryId);
        this.getProductsBySubcategoryData();
      }
    });

  }

  getProductsByBrand(): void {
    this.productsService.getProductsByBrand(this.brandId).subscribe({
      next: (res) => {
        this.SubCategoryDataList.set(res.data)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getProductsBySubcategoryData(): void {
    this.productsService.getProductsBySubcategory(this.SubCategoryId()).subscribe({
      next: (res) => {
        this.SubCategoryDataList.set(res.data)
      }
    })
  }



}
