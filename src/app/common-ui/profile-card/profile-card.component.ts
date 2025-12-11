import { Component, Input } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { CommonModule, NgIf } from '@angular/common';
import { AvatarUrlPipe } from '../../pipes/avatar-url.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [NgIf, CommonModule, AvatarUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: IProfile;

  constructor(private router: Router) {}

  onProfileClick(id: number) {
    this.router.navigate([`profile/${id}`]);
  }
}
