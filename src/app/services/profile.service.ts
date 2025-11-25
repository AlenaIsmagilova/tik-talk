import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProfile, ISuscribersPageble } from '../interfaces/profile.interface';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  me = signal<IProfile | null>(null);

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<IProfile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getSubscribersShortList(subsAmount = 3): Observable<IProfile[]> {
    return this.http
      .get<ISuscribersPageble<IProfile>>(
        `${this.baseApiUrl}account/subscribers/`
      )
      .pipe(
        map((res) => {
          return res.items.slice(0, subsAmount);
        })
      );
  }

  getAccountById(account_id: number) {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/${account_id}`);
  }
}
