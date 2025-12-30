import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from '../constants/constants';
import { ICreatePost, IPost } from '../interfaces/post.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _posts!: IPost[];
  private _mySubscriptionsPost!: IPost[];
  constructor(private http: HttpClient) {}

  // get posts(): IPost[] {
  //   return this._posts;
  // }

  get mySubscriptionsPost(): IPost[] {
    return this._mySubscriptionsPost;
  }

  getPosts(userId: number) {
    return this.http.get<IPost[]>(`${baseApiUrl}post/`, { params: { userId } });
    // .pipe(tap((res) => (this._posts = res)));
  }

  addPost(form: ICreatePost) {
    return this.http.post<IPost>(`${baseApiUrl}post/`, form);
  }

  getMySubscribtionsPosts() {
    return this.http
      .get<IPost[]>(`${baseApiUrl}post/my_subscriptions`)
      .pipe(tap((res) => (this._mySubscriptionsPost = res)));
  }
}
