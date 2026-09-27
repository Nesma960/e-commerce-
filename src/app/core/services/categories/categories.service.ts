import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoriesDataResponse } from '../../models/categories-data.interface';

@Service()
export class CategoriesService {

    private readonly httpClient = inject(HttpClient);

    getAllCategories(): Observable<CategoriesDataResponse> {
        return this.httpClient.get<CategoriesDataResponse>(`${environment.base_url}/api/v1/categories`)
    }

    GetSpecificCategory(categoryId: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.base_url}/api/v1/categories/${categoryId}`)
    }

    getAllSubCategories(cateId: string): Observable<CategoriesDataResponse> {
        return this.httpClient.get<CategoriesDataResponse>(`${environment.base_url}/api/v1/categories/${cateId}/subcategories`)
    }


}
