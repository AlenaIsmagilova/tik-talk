import { Component, Input } from '@angular/core';
import { IProfile } from '../../../interfaces/profile.interface';
import { AvatarUrlPipe } from '../../../pipes/avatar-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  imports: [AvatarUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: IProfile;
}
