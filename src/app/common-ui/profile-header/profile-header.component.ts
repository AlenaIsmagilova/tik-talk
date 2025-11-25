import { Component, Input, input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { IProfile } from '../../interfaces/profile.interface';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  imports: [SvgIconComponent, RouterLink, AsyncPipe, NgFor],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<IProfile>();
  subscribers$: Observable<IProfile[]>;

  constructor(private profileService: ProfileService) {
    this.subscribers$ = this.profileService.getSubscribersShortList(5);
  }
}
