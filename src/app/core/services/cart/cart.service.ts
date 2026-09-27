import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CartDataResponse } from '../../models/cart-data.interface';

@Service()
export class CartService {
    private readonly httpClient = inject(HttpClient);
    cartCount: WritableSignal<number> = signal<number>(0)
    addProductToCart(id: string): Observable<CartDataResponse> {
        return this.httpClient.post<CartDataResponse>(`${environment.base_url}/api/v2/cart`,
            {
                productId: id
            }
        )
    }
    getLoggedUserCart(): Observable<CartDataResponse> {
        return this.httpClient.get<CartDataResponse>(`${environment.base_url}/api/v2/cart`)
    }
    updateCartProductQuantity(productId: string, productCount: number): Observable<CartDataResponse> {
        return this.httpClient.put<CartDataResponse>(`${environment.base_url}/api/v2/cart/${productId}`,
            {
                count: productCount
            }
        )
    }
    removeProductFromCart(productId: string): Observable<CartDataResponse> {
        return this.httpClient.delete<CartDataResponse>(`${environment.base_url}/api/v2/cart/${productId}`)
    }
    clearUserCart(): Observable<CartDataResponse> {
        return this.httpClient.delete<CartDataResponse>(`${environment.base_url}/api/v2/cart`)
    }
}
