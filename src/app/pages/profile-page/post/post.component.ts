import { Component } from '@angular/core';
import { AvatarUrlPipe } from '../../../pipes/avatar-url.pipe';
import { IProfile } from '../../../interfaces/profile.interface';
import { PostService } from '../../../services/post.service';
import { DatePipe, NgFor } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-post',
  imports: [AvatarUrlPipe, NgFor],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [DatePipe],
})
export class PostComponent {
  me: IProfile | null;

  constructor(
    private postService: PostService,
    private datePipe: DatePipe,
    private profileService: ProfileService
  ) {
    this.me = this.profileService.me();
  }

  get posts() {
    return this.postService.posts;
  }

  ngOnInit() {
    this.postService.getPosts(this.me!.id).subscribe();
  }

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
}
