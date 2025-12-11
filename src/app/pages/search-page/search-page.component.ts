import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { debounceTime, map, merge, scan, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, NgFor, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  title = 'tik-talk';
  profiles: IProfile[] = [];
  form!: FormGroup;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.nonNullable.group({
      firstName: [''],
      lastName: [''],
      stack: [''],
    });

    const firstName$ = this.form.get('firstName')?.valueChanges.pipe(
      map((value) => ({
        firstName: value,
      }))
    );

    const lastName$ = this.form.get('lastName')?.valueChanges.pipe(
      map((value) => ({
        lastName: value,
      }))
    );

    const stack$ = this.form.get('stack')?.valueChanges.pipe(
      map((value) => ({
        stack: value,
      }))
    );

    merge(firstName$!, lastName$!, stack$!)
      .pipe(
        scan((acc, value) => ({ ...acc, ...value })),
        debounceTime(1000),
        switchMap(() => this.profileService.filterAccounts(this.form.value))
      )
      .subscribe((val) => (this.profiles = val.items));

    this.profileService.getTestAccounts().subscribe({
      next: (res) => {
        this.profiles = res;
      },
    });
  }

  get isFormEmpty(): boolean {
    if (!this.form) return true;

    const { firstName, lastName, stack } = this.form.value;

    return !firstName && !lastName && !stack;
  }
}
