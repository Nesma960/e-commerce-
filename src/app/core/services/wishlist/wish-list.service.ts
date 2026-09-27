import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WishlistResponse } from '../../models/wishlist.interface';

@Service()
export class WishListService {

    private readonly httpClient = inject(HttpClient);

    addProductToWishlist(productId: string): Observable<WishlistResponse> {
        return this.httpClient.post<WishlistResponse>(`${environment.base_url}/api/v1/wishlist`, {
            productId: productId
        })
    }
    getLoggedUserWishlist(): Observable<WishlistResponse> {
        return this.httpClient.get<WishlistResponse>(`${environment.base_url}/api/v1/wishlist`)
    }

    removeProductFromWishlist(productId: string): Observable<WishlistResponse> {
        return this.httpClient.delete<WishlistResponse>(`${environment.base_url}/api/v1/wishlist/${productId}`)
    }

}
