import { Component, signal } from '@angular/core';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { DndDirective } from '../../../common-ui/directives/DndDirective';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  preview = signal<string>('assets/images/default-profile.svg');
  avatar: File | null = null;

  fileHandler(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: any) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
