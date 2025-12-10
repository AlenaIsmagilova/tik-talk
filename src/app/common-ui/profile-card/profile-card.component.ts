import { Component, Input } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { CommonModule, NgIf } from '@angular/common';
import { AvatarUrlPipe } from '../../pipes/avatar-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [NgIf, CommonModule, AvatarUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: IProfile;
}
