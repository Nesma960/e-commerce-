import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ForgotPasswordDataResponse } from '../../models/forgot-password.interface';
import { ResetPasswordDataResponse } from '../../models/reset-password.interface';
import { UserDataResponse } from '../../models/user-data.interface';
import { VerifyResetCodeDataResponse } from '../../models/verify-reset-code.interface';
import { Router } from '@angular/router';

@Service()
export class AuthService {
    private readonly httpClient = inject(HttpClient)
    private readonly router = inject(Router)

    isLogged: WritableSignal<boolean> = signal<boolean>(false)

    signUp(data: object): Observable<UserDataResponse> {
        return this.httpClient.post<UserDataResponse>(`${environment.base_url}/api/v1/auth/signup`, data)
    }

    signIn(data: object): Observable<UserDataResponse> {
        return this.httpClient.post<UserDataResponse>(`${environment.base_url}/api/v1/auth/signin`, data)
    }

    signOut(): void {
        localStorage.removeItem("martoToken");
        localStorage.removeItem('userData');
        this.isLogged.set(false);
        this.router.navigate(['/login'])

    }

    forgotPassword(data: object): Observable<ForgotPasswordDataResponse> {
        return this.httpClient.post<ForgotPasswordDataResponse>(`${environment.base_url}/api/v1/auth/forgotPasswords`, data)
    }

    verifyResetCode(data: object): Observable<VerifyResetCodeDataResponse> {
        return this.httpClient.post<VerifyResetCodeDataResponse>(`${environment.base_url}/api/v1/auth/verifyResetCode`, data)
    }

    resetPassword(data: object): Observable<ResetPasswordDataResponse> {
        return this.httpClient.put<ResetPasswordDataResponse>(`${environment.base_url}/api/v1/auth/resetPassword`, data)
    }

}
