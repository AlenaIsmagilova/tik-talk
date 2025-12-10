import { Pipe, PipeTransform } from '@angular/core';
import { getAvatarUrl } from '../utils/utils';

@Pipe({
  name: 'avatarUrl',
  standalone: true,
  pure: true,
})
export class AvatarUrlPipe implements PipeTransform {
  transform(avatarUrl?: string | null): string {
    return getAvatarUrl(avatarUrl);
  }
}
