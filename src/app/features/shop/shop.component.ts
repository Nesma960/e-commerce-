import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsData } from '../../core/models/products-data.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from "../../shared/ui/card/card.component";

@Component({
  imports: [CardComponent],
  selector: 'app-shop',
  styleUrl: './shop.component.css',
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  private readonly productsService = inject(ProductsService);

  productList: WritableSignal<ProductsData[]> = signal<ProductsData[]>([])
  ProductId: string = ''

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data)
      }
    })
  }

}
