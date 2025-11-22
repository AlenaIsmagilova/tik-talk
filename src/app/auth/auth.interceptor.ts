import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptors: HttpInterceptorFn = (reg, next) => {
  const authService = inject(AuthService);

  if (!authService.accessToken) return next(reg);

  const extendedReg = reg.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.accessToken}`,
    },
  });

  return next(extendedReg).pipe(
    catchError((err) => {
      if (err.status === 403) {
        return authService.refreshAuthToken().pipe(
          switchMap(() => {
            return next(
              reg.clone({
                setHeaders: {
                  Authorization: `Bearer ${authService.accessToken}`,
                },
              })
            );
          })
        );
      }
      return throwError(() => new Error(JSON.stringify(err)));
    })
  );
};
