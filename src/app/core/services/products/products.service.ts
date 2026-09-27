import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductsDataResponse } from '../../models/products-data.interface';
import { ProductDetailsDataResponse } from '../../models/product-details-data.interface';

@Service()
export class ProductsService {

    private readonly httpClient = inject(HttpClient);

    getAllProducts(): Observable<ProductsDataResponse> {
        return this.httpClient.get<ProductsDataResponse>(`${environment.base_url}/api/v1/products`);
    }

    getSpecificProduct(productId: string): Observable<ProductDetailsDataResponse> {
        return this.httpClient.get<ProductDetailsDataResponse>(`${environment.base_url}/api/v1/products/${productId}`)
    }

    getProductsBySubcategory(subCategoryId: string): Observable<ProductDetailsDataResponse> {
        return this.httpClient.get<ProductDetailsDataResponse>(`${environment.base_url}/api/v1/products?subcategory=${subCategoryId}`)
    }

    getProductsByBrand(brandId: string): Observable<ProductDetailsDataResponse> {
        return this.httpClient.get<ProductDetailsDataResponse>(
            `${environment.base_url}/api/v1/products?brand=${brandId}`
        );
    }
}


