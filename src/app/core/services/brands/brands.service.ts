import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BrandsDataResponse } from '../../models/brands-data.interface';

@Service()
export class BrandsService {
    private readonly httpClient = inject(HttpClient);

    getAllBrands(): Observable<BrandsDataResponse> {
        return this.httpClient.get<BrandsDataResponse>(`${environment.base_url}/api/v1/brands`);
    }

    getSpecificBrand(brandId: string): Observable<BrandsDataResponse> {
        return this.httpClient.get<BrandsDataResponse>(`${environment.base_url}/api/v1/brands/${brandId}`)
    }

}

