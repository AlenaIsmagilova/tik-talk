import { Component, WritableSignal } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '../../services/profile.service';
import { Observable, firstValueFrom } from 'rxjs';
import { IProfile } from '../../interfaces/profile.interface';
import { AvatarUrlPipe } from '../../pipes/avatar-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    NgFor,
    RouterLink,
    SubscriberCardComponent,
    AsyncPipe,
    CommonModule,
    AvatarUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  subscribers$: Observable<IProfile[]>;
  me: WritableSignal<IProfile | null>;

  constructor(private profileService: ProfileService) {
    this.subscribers$ = this.profileService.getSubscribersShortList();
    this.me = this.profileService.me;
  }

  menuList = [
    {
      label: 'Моя страница',
      icon: 'home-icon',
      path: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      path: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      path: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
