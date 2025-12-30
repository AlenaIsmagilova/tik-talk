import { Component, Input, inject } from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { IProfile } from '../../../interfaces/profile.interface';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent, AsyncPipe],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  @Input() profile!: IProfile;
  route = inject(ActivatedRoute);
}
