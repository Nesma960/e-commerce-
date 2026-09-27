import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('martoToken');
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        token: token,
      },
    });
  }

  return next(req);
};