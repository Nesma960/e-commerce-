import { Component, inject, input, InputSignal, PLATFORM_ID } from '@angular/core';
import { ProductsData } from '../../../core/models/products-data.interface';
import { RouterLink } from "@angular/router";
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishListService } from '../../../core/services/wishlist/wish-list.service';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-card',
  styleUrl: './card.component.css',
  templateUrl: './card.component.html',
})
export class CardComponent {
  product: InputSignal<ProductsData> = input.required()
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly platForm = inject(PLATFORM_ID);
  private readonly wishListService = inject(WishListService);

  addProductItemToCart(productId: string): void {
    const token = localStorage.getItem('martoToken');

    if (isPlatformBrowser(this.platForm)) {
      if (token) {
        this.cartService.addProductToCart(productId).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.toastrService.success(res.message, 'Mart Cart', {
                progressBar: true,
                progressAnimation: 'increasing',
                timeOut: 2000,
                closeButton: true
              })

              this.cartService.cartCount.set(res.numOfCartItems)
            }

          }
        })
      }
    }
    else {
      this.toastrService.warning('Please Login To Continue', 'Mart Cart', {
        progressBar: true,
        progressAnimation: 'increasing',
        timeOut: 2000,
        closeButton: true
      })
    }
  }

  addProductItemToWishlist(productId: string): void {
    this.wishListService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          // toaster message
          this.toastrService.success('Added to wishlist! ♡', 'Marto', {
            progressBar: true,
            timeOut: 2000,
            progressAnimation: 'increasing',
            closeButton: true
          })
        }

      }
    })
  }
}
