import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from '../interfaces/profile.interface';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  accessToken: string | null = null;
  refreshToken: string | null = null;

  constructor(
    private httpService: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('access_token');
      this.refreshToken = this.cookieService.get('refresh_token');
    }
    return !!this.accessToken;
  }

  public login(payload: { username: string; password: string }) {
    const formdata = new FormData();

    formdata.append('username', payload.username);
    formdata.append('password', payload.password);

    return this.httpService
      .post<ILoginResponse>(`${this.baseApiUrl}auth/token`, formdata)
      .pipe(
        tap((val) => {
          this.saveTokens(val);
        })
      );
  }

  public logout() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);

    return this.httpService.post<string>(
      `${this.baseApiUrl}auth/logout`,
      null,
      { headers }
    );
  }

  public refreshAuthToken() {
    return this.httpService
      .post<ILoginResponse>(`${this.baseApiUrl}auth/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((val) => {
          this.saveTokens(val);
        }),
        catchError((err) => {
          console.log(err, 'err in refresh auth');
          this.logout();
          return throwError(() => new Error('error'));
        })
      );
  }

  private saveTokens(res: ILoginResponse) {
    this.accessToken = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('access_token', this.accessToken);
    this.cookieService.set('refresh_token', this.refreshToken);
  }
}
