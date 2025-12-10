import { Component, ViewChild, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { filter, firstValueFrom, map, switchMap } from 'rxjs';
import { IUpdateMe } from '../../interfaces/profile.interface';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { Router } from '@angular/router';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { AuthService } from '../../auth/auth.service';
import { AvatarUrlPipe } from '../../pipes/avatar-url.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-page',
  imports: [
    ReactiveFormsModule,
    AvatarUploadComponent,
    SvgIconComponent,
    AvatarUrlPipe,
    CommonModule,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  formBuilder = inject(FormBuilder);
  //работает как квериселектер
  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.formBuilder.group({
    firstName: this.formBuilder.control<string>('', Validators.required),
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: this.formBuilder.control<string[] | string>([], {
      nonNullable: true,
    }),
  });

  constructor(
    public profileService: ProfileService,
    private router: Router,
    private authService: AuthService
  ) {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        stack: this.mergeStack(this.profileService.me()!.stack),
      });
    });
  }

  ngOnInit() {
    this.profileService.getMe().subscribe();
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.profileService
      //@ts-ignore
      .updateProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      })
      .pipe(
        switchMap(() => {
          return this.profileService.getMe();
        })
      )
      .subscribe((totalResult) => console.log(totalResult));

    if (this.avatarUploader.avatar) {
      this.profileService
        .uploadImage(this.avatarUploader.avatar as File)
        .subscribe();
    }

    this.router.navigate(['profile/me']);
  }

  splitStack(value: string | null | string[] | undefined) {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    return value.split(',');
  }

  mergeStack(value: string | null | string[] | undefined) {
    if (!value) return '';
    if (Array.isArray(value)) return value.join(',');

    return value;
  }

  onLogoutClick() {
    this.authService.logout().subscribe();
  }
}
