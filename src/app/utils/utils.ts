import { baseApiUrl } from '../constants/constants';

export const getAvatarUrl = (avatarUrl?: string | null) => {
  if (!avatarUrl) {
    return 'assets/images/default-profile.svg';
  }

  if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')) {
    return avatarUrl;
  }

  return `${baseApiUrl}${avatarUrl.replace(/^\/+/, '')}`;
};
