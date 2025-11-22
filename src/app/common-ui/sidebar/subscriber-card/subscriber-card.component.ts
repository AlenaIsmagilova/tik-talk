import { Component, Input } from '@angular/core';
import { IProfile } from '../../../interfaces/profile.interface';

@Component({
  selector: 'app-subscriber-card',
  imports: [],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: IProfile;
}
