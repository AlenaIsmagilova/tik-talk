import { Component, Input } from '@angular/core';
import { AvatarUrlPipe } from '../../../pipes/avatar-url.pipe';
import { IProfile } from '../../../interfaces/profile.interface';
import { PostService } from '../../../services/post.service';
import { DatePipe, NgFor } from '@angular/common';
import { CommentBlockComponent } from '../comment-block/comment-block.component';
import { IPost } from '../../../interfaces/post.interface';

@Component({
  selector: 'app-post',
  imports: [AvatarUrlPipe, NgFor, CommentBlockComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [DatePipe],
})
export class PostComponent {
  posts: IPost[];
  private _profile: IProfile;
  // @Input() profile!: IProfile;

  @Input()
  set profile(profile: IProfile) {
    this._profile = profile;
    this._getPost();
  }

  get profile(): IProfile {
    return this._profile;
  }

  constructor(private postService: PostService, private datePipe: DatePipe) {}

  // get posts() {
  //   return this.postService.posts;
  // }

  // ngOnInit() {
  //   this.postService.getPosts(this.profile.id).subscribe();
  // }

  getDate(date: string) {
    const onlyDay = this.datePipe
      .transform(Date.now(), 'd.M.yy, HH:mm')!
      .slice(0, 8);
    const onlyCreatedDay = this.datePipe
      .transform(date, 'd.M.yy, HH:mm')!
      .slice(0, 8);

    if (onlyDay === onlyCreatedDay) {
      return this.datePipe.transform(date, 'HH:mm');
    } else {
      return this.datePipe.transform(date, 'd.M.yy');
    }
  }

  private _getPost() {
    this.postService
      .getPosts(this.profile.id)
      .subscribe((posts) => (this.posts = posts));
  }
}
