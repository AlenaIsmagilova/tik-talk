import { FormControl, FormGroup } from '@angular/forms';

export interface IProfile {
  id: number;
  username: string;
  avatarUrl: string;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}

export interface IUserLoginFormValue {
  username: string;
  password: string;
}

export type UserLoginFormGroup = FormGroup<{
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}>;

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface ISuscribersPageble<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
