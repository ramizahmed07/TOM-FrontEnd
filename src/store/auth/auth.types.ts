export interface IAuthState {
  user: any;
  token: {
    access: null | string;
    refresh: null | string;
  };
  permissions: string[];
  is_one_time_password: boolean;
}
