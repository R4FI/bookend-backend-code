import { ENUM_USER_ROLE } from '../../../enums/user_enum';

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  name: string;
  email: string;
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};
