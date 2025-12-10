import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, finalize, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth.service';

//чтото среднее между стримом и сигналом(можно подписаться а можно и без подписки в любой момент времени получить актуальное значение)
let isRefreshing$ = new BehaviorSubject<boolean>(false);
let refreshToken$: Observable<any>;

//берем исходный запрос req, цепляем к нему заголовок и отправляем дальше
const addAuthHeader = (req: HttpRequest<any>, token: string) =>
  req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

export const authInterceptors: HttpInterceptorFn = (reg, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.accessToken;
  //дергаем геттер чтобы токены подгрузить из кук
  authService.isAuth;

  if (!accessToken) return next(reg);

  let authReg = reg;
  if (accessToken) {
    authReg = addAuthHeader(reg, accessToken);
  }

  return next(authReg).pipe(
    catchError((err) => {
      if (err.status === 403 && authService.refreshToken) {
        if (!isRefreshing$.value) {
          isRefreshing$.next(true);

          refreshToken$ = authService
            .refreshAuthToken()
            //неважно чем завершится , файналайз отработает всегда
            .pipe(finalize(() => isRefreshing$.next(false)));
          //оператор,к\т делает один источник данных доступный нескольким подписчикам и кэширует последние N значений и передает для подписчиков(нет лишних запросов)
          shareReplay(1);
        }

        return refreshToken$.pipe(
          switchMap(() => {
            const newAccessToken = authService.accessToken!;
            return next(addAuthHeader(reg, newAccessToken));
          })
        );
      }

      return throwError(() => err);
    })
  );
};
