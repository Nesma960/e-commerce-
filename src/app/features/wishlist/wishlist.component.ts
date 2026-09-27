import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishListService } from '../../core/services/wishlist/wish-list.service';
import { Wishlist } from '../../core/models/wishlist.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-wishlist',
  styleUrl: './wishlist.component.css',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService)
  wishlistData: WritableSignal<Wishlist[]> = signal<Wishlist[]>([])

  ngOnInit(): void {
    this.getWishlistData()
  }

  getWishlistData(): void {
    this.wishListService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishlistData.set(res.data)
        }

      }
    })
  }
  removeProductItemFromWishlist(productId: string): void {
    this.wishListService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {

          // toaster message 
          this.toastrService.success('Product removed successfully to your wishlist', 'Marto', {
            progressAnimation: 'increasing',
            progressBar: true,
            timeOut: 2000,
            closeButton: true
          })

          this.wishlistData.update((items) =>
            items.filter((item) => item._id !== productId)
          );
        }

      }
    })
  }

}
