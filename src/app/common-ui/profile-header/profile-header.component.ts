import { Component, inject, input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { IProfile } from '../../interfaces/profile.interface';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { PostFeedComponent } from '../../pages/profile-page/post-feed/post-feed.component';
import { AvatarUrlPipe } from '../../pipes/avatar-url.pipe';

@Component({
  selector: 'app-profile-header',
  imports: [
    SvgIconComponent,
    RouterLink,
    AsyncPipe,
    NgFor,
    PostFeedComponent,
    AvatarUrlPipe,
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<IProfile>();
  subscribers$: Observable<IProfile[]>;
  route = inject(ActivatedRoute);

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.subscribers$ = this.route.params.pipe(
      switchMap(({ id }) => {
        if (id === 'me') return this.profileService.getSubscribersShortList(5);
        return this.profileService.getSubscribersForUser(id);
      })
    );
  }
}
