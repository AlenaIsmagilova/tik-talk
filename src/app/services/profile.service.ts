import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import {
  IProfile,
  ISuscribersPageble,
  IUpdateMe,
} from '../interfaces/profile.interface';
import { Observable, map, tap } from 'rxjs';
import { baseApiUrl } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  me = signal<IProfile | null>(null);

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<IProfile>(`${baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getSubscribersShortList(subsAmount = 3): Observable<IProfile[]> {
    return this.http
      .get<ISuscribersPageble<IProfile>>(`${baseApiUrl}account/subscribers/`)
      .pipe(
        map((res) => {
          return res.items.slice(0, subsAmount);
        })
      );
  }

  getSubscribersForUser(accountId: number): Observable<IProfile[]> {
    return this.http
      .get<ISuscribersPageble<IProfile>>(
        `${baseApiUrl}account/subscribers/${accountId}`
      )
      .pipe(map((res) => res.items));
  }

  getAccountById(account_id: number) {
    return this.http.get<IProfile>(`${baseApiUrl}account/${account_id}`);
  }

  updateProfile(form: IUpdateMe) {
    return this.http.patch<IProfile>(`${baseApiUrl}account/me`, form);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<IProfile>(
      `${baseApiUrl}account/upload_image`,
      formData
    );
  }

  filterAccounts(params: Record<string, any>) {
    return this.http.get<ISuscribersPageble<IProfile>>(
      `${baseApiUrl}account/accounts`,
      { params }
    );
  }
}
