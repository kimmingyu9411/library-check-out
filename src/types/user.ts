export type LoginInfo = {
  nickname: string;
  password: string;
};

export type UserInfo = LoginInfo & {
  isAdmin: boolean;
  name: string;
  mobile: string;
};

export type UpdateInfo = {
  [key: string]: string | undefined;

  confirmPassword: string;
  password?: string;
  nickname?: string;
};
