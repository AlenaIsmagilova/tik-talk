import { Component } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { NgFor } from '@angular/common';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, NgFor],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  title = 'tik-talk';
  profiles: IProfile[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getTestAccounts().subscribe({
      next: (res) => {
        this.profiles = res;
      },
      error: (err) => {
        console.log('err from search page ', err);
      },
    });
  }
}
