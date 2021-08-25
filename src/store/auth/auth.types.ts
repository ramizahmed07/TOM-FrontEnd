export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_code: number;
  role: string;
  is_active: boolean;
}

export type User = IUser | null;

export interface IAuthState {
  user: User;
  token: {
    access: null | string;
    refresh: null | string;
  };
  permissions: string[];
  is_one_time_password: boolean;
}
