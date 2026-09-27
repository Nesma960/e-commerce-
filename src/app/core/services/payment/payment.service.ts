import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaymentCashData, PaymentCashDataResponse } from '../../models/payment-cash-data.interface';
import { PaymentVisaDataResponse } from '../../models/payment-visa-data.interface';

@Service()
export class PaymentService {
    private readonly httpClient = inject(HttpClient);

    createCashOrder(cartId: string, data: object): Observable<PaymentCashDataResponse> {
        return this.httpClient.post<PaymentCashDataResponse>(`${environment.base_url}/api/v1/orders/${cartId}`, data)
    }
    checkoutSession(cartId: string, data: object): Observable<PaymentVisaDataResponse> {
        return this.httpClient.post<PaymentVisaDataResponse>(`${environment.base_url}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, data)
    }

}
